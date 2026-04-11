import '../index.css';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import CookieConsent from '../components/CookieConsent';
import AnnouncementMarquee from '../components/AnnouncementMarquee';

export const metadata = {
  title: 'ПАРАЛЛАКС — Образовательная экосистема',
  description: 'Образовательная экосистема (школа и IT в одном месте).',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <Script id="metrika-counter" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
            ym(XXXXXXXX, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true
            });
          `}
        </Script>
      </head>
      <body>
        <AnnouncementMarquee />
        {children}
        <CookieConsent />
        <Analytics />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#12121e',
              color: '#e0e0ff',
              border: '1px solid rgba(0,255,135,0.2)',
              fontFamily: 'Inter, sans-serif',
            },
            success: { iconTheme: { primary: '#00ff87', secondary: '#050508' } },
            error: { iconTheme: { primary: '#ff453a', secondary: '#050508' } },
          }}
        />
      </body>
    </html>
  );
}
