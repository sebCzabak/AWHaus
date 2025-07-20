import CookieConsent from 'react-cookie-consent';

export function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Akceptuję"
      declineButtonText="Odrzucam"
      enableDeclineButton
      cookieName="strona-dewelopera-zgoda-ciasteczka"
      style={{
        background: '#2B373B',
        fontSize: '15px',
        alignItems: 'center',
      }}
      buttonStyle={{
        background: '#af2249', // Kolor z Twojego motywu
        color: 'white',
        fontSize: '14px',
        borderRadius: '5px',
        padding: '10px 15px',
      }}
      declineButtonStyle={{
        background: '#777',
        color: 'white',
        fontSize: '14px',
        borderRadius: '5px',
        padding: '10px 15px',
      }}
      expires={150}
    >
      Ta strona korzysta z plików cookie, aby zapewnić najlepszą jakość korzystania z naszej witryny.{" "}
      <a href="/polityka-prywatnosci" style={{ color: 'white', textDecoration: 'underline' }}>
        Dowiedz się więcej
      </a>
    </CookieConsent>
  );
}