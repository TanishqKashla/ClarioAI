import Navbar from '@/components/layout/Navbar';
import './globals.css'
import StudyPlanWrapper from '@/components/providers/StudyPlanWrapper';
import Sidebar from '@/components/layout/Sidebar';

export const metadata = {
  title: 'StudySync - Your Study Planning Companion',
  description: 'AI-powered study plan generator to help you prepare for exams effectively',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col  bg-dark-200">
        <StudyPlanWrapper>
          <Navbar />
          <div className="flex flex-1 overflow-hidden mt-16">
            <Sidebar />
            <main className="flex-1 ml-52 overflow-auto">{children}</main>
          </div>
        </StudyPlanWrapper>
      </body>
    </html>
  );
}