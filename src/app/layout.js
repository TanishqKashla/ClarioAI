import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import StudyPlanWrapper from "@/components/providers/StudyPlanWrapper";
import Sidebar from "@/components/layout/Sidebar";
import { SessionProvider } from "@/components/providers/SessionProvider";
import localFont from 'next/font/local';

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
  title: "ClarioAI - Your AI Study Companion",
  description:
    "AI-powered study plan generator to help you prepare for exams effectively",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${styrene.variable} ${tiempos.variable}`}>
      <body className="flex flex-col bg-dark-200 font-tiempos">
        <SessionProvider>
          <StudyPlanWrapper>
            <div className="flex h-full">
                <Navbar />
              <Sidebar >
                <main className="overflow-auto mt-16">{children}</main>
              </Sidebar>
            </div>
          </StudyPlanWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
