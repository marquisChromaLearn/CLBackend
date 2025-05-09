// src/app/layout.tsx (or wherever your root layout lives)
import './styles.css'

export const metadata = {
  title: 'Payload Blank Template',
  description: 'A blank template using Payload in a Next.js app.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* suppressHydrationWarning prevents extensions like Grammarly
          from breaking React’s initial hydrate */}
      <body suppressHydrationWarning>
        <main>{children}</main>
      </body>
    </html>
  )
}
