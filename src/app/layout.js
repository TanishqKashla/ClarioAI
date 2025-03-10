import './globals.css'

export const metadata = {
  title: 'StudySync - Your Study Planning Companion',
  description: 'AI-powered study plan generator to help you prepare for exams effectively',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}