import './globals.css'

export const metadata = {
  title: 'VerifiNews-AI - Fake News Detection',
  description: 'MCA Final Year Project - Galgotias University',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
