import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { setGlobalOptions } from 'firebase-functions/v2';

import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";

import * as os from "os";
import * as path from "path";
import * as fs from "fs";


interface Apartment {
  id: string;
  price?: string;
  area?: number;
  rooms?: number;
  status?: string;
  exposure?: string;
  isPremium?: boolean;
   planUrl?: string;
}

interface Investment {
  name: string;
  apartments: Apartment[];
   location: string;
}

admin.initializeApp();
setGlobalOptions({ region: 'europe-west3' });


/**
 * Funkcja wyzwalana przez Firestore.
 */
export const sendMailOnNewMessage = onDocumentCreated("messages/{messageId}", async (event) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: (process.env.SMTP_PORT || "465") === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const snapshot = event.data;
  if (!snapshot) {
    functions.logger.error("Brak danych w zdarzeniu create dla 'messages'!");
    return;
  }
  const messageData = snapshot.data();

    const adminMailOptions = {
    from: `Strona AWHaus <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: messageData.email,
    subject: `Nowa wiadomość z formularza: ${messageData.name}`,
    html: `<p><strong>Od:</strong> ${messageData.name} (${messageData.email})</p>
    <p><strong>Telefon:</strong> ${messageData.phone || 'Nie podano'}</p>
    <hr><p><strong>Wiadomość:</strong></p><p style="white-space: pre-wrap;">${messageData.message}</p>`,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    functions.logger.log(`E-mail z formularza od ${messageData.email} został wysłany pomyślnie!`);
  } catch (error) {
    functions.logger.error('Błąd podczas wysyłania e-maila z formularza:', error);
  }
   // --- CZĘŚĆ 2: WYSYŁKA AUTOMATYCZNEJ ODPOWIEDZI DO KLIENTA ---
  // Ta część wykona się tylko, jeśli zapytanie dotyczyło konkretnego mieszkania.
  if (messageData.investmentId && messageData.apartmentId) {
    try {
      // --- Krok 1: Pobierz dane inwestycji z Firestore ---
      const investmentDoc = await admin.firestore().collection("investments").doc(messageData.investmentId).get();
      if (!investmentDoc.exists) {
        throw new Error(`Nie znaleziono inwestycji o ID: ${messageData.investmentId}`);
      }
      const investmentData = investmentDoc.data()!;
      
      // --- Krok 2: Znajdź konkretne mieszkanie w danych inwestycji ---
      const apartment = investmentData.apartments.find((apt: Apartment) => apt.id === messageData.apartmentId);
      if (!apartment) {
        throw new Error(`Nie znaleziono mieszkania o ID: ${messageData.apartmentId}`);
      }
      
      // Dalsza część kodu wykona się tylko, jeśli mieszkanie ma rzut PDF
      if (!apartment.planUrl) {
        logger.warn(`Mieszkanie ${apartment.id} nie ma przypisanego rzutu PDF. Auto-odpowiedź nie zostanie wysłana.`);
        return;
      }

      // --- Krok 3: Pobierz plik PDF ze Storage ---
      const bucket = admin.storage().bucket();
      const filePath = apartment.planUrl;
      const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));
      await bucket.file(filePath).download({ destination: tempFilePath });
      logger.log(`Plik PDF "${filePath}" pobrany do ścieżki tymczasowej.`);

      // --- Krok 4: Skonfiguruj i wyślij e-mail do klienta ---
      const clientMailOptions = {
        from: `AWHaus Deweloper <${process.env.SMTP_USER}>`,
        to: messageData.email,
        subject: `Potwierdzenie zapytania - Mieszkanie ${apartment.id.toUpperCase()} w ${investmentData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="text-align: center; padding: 20px; background-color: #f9f9f9;">
              <img src="[URL_DO_LOGO_FIRMY_WGRANEGO_NA_STORAGE]" alt="AWHaus Logo" style="max-width: 150px;">
            </div>
            <div style="padding: 20px;">
              <h2 style="color: #83907c;">Dzień dobry ${messageData.name},</h2>
              <p>dziękujemy za zainteresowanie naszą inwestycją <strong>${investmentData.name}</strong>. To doskonały wybór!</p>
              <p>Poniżej przesyłamy podsumowanie dotyczące mieszkania, o które Państwo pytali:</p>
              <div style="border: 1px solid #eee; padding: 15px; border-radius: 8px; background-color: #fdfdfd;">
                <p><strong>Numer lokalu:</strong> ${apartment.id.toUpperCase()}</p>
                <p><strong>Liczba pokoi:</strong> ${apartment.rooms}</p>
                <p><strong>Metraż:</strong> ${apartment.area} m²</p>
                <p><strong>Status:</strong> ${apartment.status}</p>
              </div>
              <p>W załączniku znajdą Państwo szczegółowy rzut architektoniczny tego mieszkania.</p>
              <p>Nasz doradca skontaktuje się z Państwem w ciągu 24 godzin, aby odpowiedzieć na wszelkie pytania.</p>
              <br>
              <p>Z pozdrowieniami,</p>
              <p><strong>Zespół AWHaus Deweloper</strong><br>
                 tel: +48 600 099 572<br>
                 e-mail: biuro@awhaus.pl<br>
                 AWHaus.pl
              </p>
            </div>
          </div>
        `,
        attachments: [{
          filename: `AWHaus - Rzut mieszkania ${apartment.id.toUpperCase()}.pdf`,
          path: tempFilePath,
          contentType: "application/pdf",
        }],
      };
      
      await transporter.sendMail(clientMailOptions);
      logger.log(`Automatyczna odpowiedź z PDF wysłana do: ${messageData.email}`);
      
      // --- Krok 5: Usuń plik tymczasowy ---
      fs.unlinkSync(tempFilePath);

    } catch (error) {
      logger.error("Błąd podczas wysyłania automatycznej odpowiedzi do klienta:", error);
    }
  }
});


/**
 * Funkcja wyzwalana przez harmonogram (Scheduled).
 */
export const sendDailyPriceReport = onSchedule(
  {
    schedule: 'every day 21:00',
    timeZone: 'Europe/Warsaw',
  },
  async () => {
     const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465", 10),
      secure: (process.env.SMTP_PORT || "465") === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    functions.logger.log('Rozpoczynam generowanie dziennego raportu cen.');

    try {
      const investmentsSnapshot = await admin.firestore().collection('investments').get();

      if (investmentsSnapshot.empty) {
        functions.logger.log('Brak inwestycji w bazie danych do raportowania.');
        return;
      }

      let emailBody = `<h1>Dzienny raport cen - ${new Date().toLocaleDateString('pl-PL')}</h1>`;
      emailBody += '<p>Poniżej znajduje się lista wszystkich mieszkań wraz z ich aktualnymi cenami.</p>';

      investmentsSnapshot.forEach((doc) => {
        const investment = doc.data();
        emailBody += `<h2>Inwestycja: ${investment.name}</h2>`;
        emailBody +=
          "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; width: 100%;'>";
        emailBody += '<thead><tr><th>ID Mieszkania</th><th>Cena</th><th>Metraż</th><th>Status</th></tr></thead><tbody>';

        if (investment.apartments && investment.apartments.length > 0) {
          investment.apartments.forEach((apt: Apartment) => {
            emailBody += `
            <tr>
              <td>${apt.id || 'Brak ID'}</td>
              <td>${apt.price || 'Brak danych'}</td>
              <td>${apt.area ? `${apt.area} m²` : 'Brak danych'}</td>
              <td>${apt.status || 'Brak danych'}</td>
            </tr>
          `;
          });
        } else {
          emailBody += "<tr><td colspan='4'>Brak mieszkań w tej inwestycji.</td></tr>";
        }
        emailBody += '</tbody></table>';
      });

      const mailOptions = {
        from: `Serwer AWHaus <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        subject: `Raport Cenowy AWHaus - ${new Date().toLocaleDateString('pl-PL')}`,
        html: emailBody,
      };

      await transporter.sendMail(mailOptions);
      functions.logger.log('Dzienny raport cen został wysłany pomyślnie!');
    } catch (error) {
      functions.logger.error('Błąd podczas generowania raportu cen:', error);
    }
  }
);
export const daneApi = onRequest(async (request, response) => {
  // Krok 1: Ustaw nagłówki CORS, aby zezwolić na publiczny dostęp z dowolnej domeny.
  // To jest kluczowe, aby system dane.gov.pl mógł pobrać dane.
  response.set("Access-Control-Allow-Origin", "*");

  // Upewniamy się, że odpowiadamy tylko na żądania typu GET
  if (request.method !== "GET") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  try {
    // Krok 2: Pobierz wszystkie inwestycje z bazy danych
    const investmentsSnapshot = await admin.firestore().collection("investments").get();

    if (investmentsSnapshot.empty) {
      response.status(404).json({ error: "Brak danych o inwestycjach." });
      return;
    }

    // Krok 3: Sformatuj dane do pożądanej struktury
    const investmentsData = investmentsSnapshot.docs.map((doc) => {
      const investment = doc.data() as Investment;
     return {
idInwestycji: doc.id,
 nazwa: investment.name,
 lokalizacja: investment.location,
        // 3. Zamiast (apt: any), używamy (apt: Apartment)
mieszkania: investment.apartments.map((apt: Apartment) => ({
idMieszkania: apt.id,
 status: apt.status,
cena: apt.price,
metraz: apt.area,
 ekspozycja: apt.exposure || null,
premium: apt.isPremium || false,
 })),
      };
    });

    // Krok 4: Stwórz finalny obiekt odpowiedzi JSON
    const apiResponse = {
      dostawcaDanych: "AWHaus Deweloper", // Twoja nazwa firmy
      daneNaDzien: new Date().toISOString(), // Aktualna data i czas w formacie ISO
      zasob: {
        typ: "API",
        format: "JSON",
      },
      inwestycje: investmentsData,
    };

    // Krok 5: Wyślij odpowiedź w formacie JSON
    response.status(200).json(apiResponse);

  } catch (error) {
    logger.error("Błąd podczas generowania danych dla API dane.gov.pl:", error);
    response.status(500).json({ error: "Wystąpił wewnętrzny błąd serwera." });
  }
});