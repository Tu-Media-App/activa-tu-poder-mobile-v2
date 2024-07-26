type Config = {
  firebaseClientId: string;
  redirectUri: string;
  googleWebClientId: string;
  termsUrl: string;
  
};

export const config: Config = {
  firebaseClientId: process.env.CLIENT_ID || 'secret',
  redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000',
  googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID || 'secret',
  termsUrl: 'https://luisapp.vercel.app/terms.html',
};
