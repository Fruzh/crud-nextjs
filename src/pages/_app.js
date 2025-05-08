import '@/styles/globals.css';
import NotificationManager from '@/components/notificationManager';

export default function App({ Component, pageProps }) {
    return (
        <>
            <NotificationManager />
            <Component {...pageProps} />
        </>
    );
}