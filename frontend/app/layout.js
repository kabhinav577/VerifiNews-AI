import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VerifiNews-AI - Fake News Detection',
  description: 'MCA Final Year Project - Galgotias University',
  icons: {
    icon: '/verifinews-ai-favicon.ico',
    shortcut: '/verifinews-ai-favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 text-slate-900 min-h-screen transition-colors`}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
