import { SessionProvider } from './contexts/sessionContext';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
