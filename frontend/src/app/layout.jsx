import '../index.css';
import { Manrope, Unbounded } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import CookieConsent from '../components/CookieConsent';
import AnnouncementMarquee from '../components/AnnouncementMarquee';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
});

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-unbounded',
  display: 'swap',
  weight: ['500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'ПАРАЛЛАКС — Подготовка к ЕГЭ, ОГЭ и IT-курсы',
  description:
    'Школьные предметы, подготовка к экзаменам и IT-программы. Кураторы, разбор ДЗ и понятный прогресс.',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${unbounded.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_YM_ID ? (
          <Script id="metrika-counter" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(${Number(process.env.NEXT_PUBLIC_YM_ID)}, "init", {
                   clickmap:true,
                   trackLinks:true,
                   accurateTrackBounce:true,
                   webvisor:true
              });
            `}
          </Script>
        ) : null}
      </head>
      <body className={`${manrope.className} antialiased`}>
        <AnnouncementMarquee />
        {children}
        <CookieConsent />
        <Analytics />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#ffffff',
              color: '#111111',
              border: '1px solid #ececec',
              fontFamily: 'var(--font-manrope), Manrope, system-ui, sans-serif',
            },
            success: { iconTheme: { primary: '#111111', secondary: '#ffffff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#ffffff' } },
          }}
        />
      </body>
    </html>
  );
}
