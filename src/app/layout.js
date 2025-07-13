import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import StudyPlanWrapper from "@/components/providers/StudyPlanWrapper";
import Sidebar from "@/components/layout/Sidebar";
import { SessionProvider } from "@/components/providers/SessionProvider";
import localFont from 'next/font/local';
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator"
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang="en" suppressHydrationWarning className={`${styrene.variable} ${tiempos.variable}`}>
      <body className="font-tiempos">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>

                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 fixed w-full z-10 bg-background/60 backdrop-blur-md">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <ModeToggle />
                </header>
                {/* <Navbar />
              <Sidebar > */}
                <main className="mt-16">{children}</main>
                {/* </Sidebar> */}
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
