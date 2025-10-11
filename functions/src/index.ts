import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { setGlobalOptions } from 'firebase-functions/v2';

import { onRequest } from "firebase-functions/v2/https";

admin.initializeApp();
setGlobalOptions({ region: 'europe-west3' });

const smtpConfig = functions.config().smtp;

const transporter = nodemailer.createTransport({
  host: smtpConfig.host,
  port: parseInt(smtpConfig.port, 10),
  secure: smtpConfig.port === '465',
  auth: {
    user: smtpConfig.user,
    pass: smtpConfig.pass,
  },
});

/**
 * Funkcja wyzwalana przez Firestore.
 */
export const sendMailOnNewMessage = onDocumentCreated('messages/{messageId}', async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    functions.logger.error("Brak danych w zdarzeniu create dla 'messages'!");
    return;
  }
  const messageData = snapshot.data();

  const mailOptions = {
    from: `Strona AWHaus <${smtpConfig.user}>`,
    to: smtpConfig.user,
    replyTo: messageData.email,
    subject: `Nowa wiadomość z formularza: ${messageData.name}`,
    html: `
        <p><strong>Od:</strong> ${messageData.name} (${messageData.email})</p>
        <hr>
        <p><strong>Wiadomość:</strong></p>
        <p style="white-space: pre-wrap;">${messageData.message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    functions.logger.log(`E-mail z formularza od ${messageData.email} został wysłany pomyślnie!`);
  } catch (error) {
    functions.logger.error('Błąd podczas wysyłania e-maila z formularza:', error);
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
          investment.apartments.forEach((apt: any) => {
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
        from: `Serwer AWHaus <${smtpConfig.user}>`,
        to: smtpConfig.user,
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
      const investment = doc.data();
      return {
        idInwestycji: doc.id,
        nazwa: investment.name,
        lokalizacja: investment.location,
        mieszkania: investment.apartments.map((apt: any) => ({
          idMieszkania: apt.id,
          status: apt.status,
          cena: apt.price,
          metraz: apt.area,
          ekspozycja: apt.exposure || null, // Dodajemy nowe pole
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