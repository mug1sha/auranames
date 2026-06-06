import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'AuraNames - Prestige AI Name Generator',
  description: 'Generate prestige, meaningful names instantly with AI. Perfect for kids, pets, businesses, and products.',
  generator: 'v0.app',
  keywords: ['AI', 'name generator', 'baby names', 'pet names', 'business names', 'brand names', 'elegant', 'prestige'],
  icons: {
    icon: '/auraname_logo.png',
    apple: '/auraname_logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A192F',
  width: 'device-width',
  initialScale: 1,
}

/**
 * Root application layout that applies global fonts and background, wraps page content with authentication, and conditionally enables analytics.
 *
 * @param children - The page or component tree to render inside the layout; receives authentication context from `AuthProvider`.
 * @returns The top-level HTML structure (`<html>` and `<body>`) with configured font CSS variables and background classes, containing `children` wrapped by `AuthProvider` and `Analytics` rendered only in production.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen bg-background">
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
