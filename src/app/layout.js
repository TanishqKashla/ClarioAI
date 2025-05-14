import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import StudyPlanWrapper from "@/components/providers/StudyPlanWrapper";
import Sidebar from "@/components/layout/Sidebar";
import { SessionProvider } from "@/components/providers/SessionProvider";

export const metadata = {
  title: "StudySync - Your Study Planning Companion",
  description:
    "AI-powered study plan generator to help you prepare for exams effectively",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col bg-dark-200">
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
