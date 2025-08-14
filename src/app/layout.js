import Navbar from "@/components/layout/Navbar";
import "./globals.css";

import localFont from 'next/font/local';

import ClientWrapper from "./clientWrapper";

const styrene = localFont({
  src: [
    {
      path: '../../public/styrene-font-family/StyreneA-Regular-Trial-BF63f6cbd970ee9.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/styrene-font-family/StyreneA-Medium-Trial-BF63f6cbdb24b6d.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/styrene-font-family/StyreneA-Bold-Trial-BF63f6cbda1877f.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-styrene'
});

const tiempos = localFont({
  src: [
    {
      path: '../../public/tiempos-font-family/TestTiemposText-Regular-BF66457a50cd521.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/tiempos-font-family/TestTiemposText-Medium-BF66457a508489a.otf',
      weight: '500',
      style: 'normal',
    }
  ],
  variable: '--font-tiempos'
});

export const metadata = {
  title: "ClarioAI",
  description:
    "Your AI Study Companion",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning className={`${styrene.variable} ${tiempos.variable}`}>
      <body className="font-tiempos">
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
