import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import StructuredData from "@/components/structured-data"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EDU21 - Software Educativo de Última Generación",
  description: "Soluciones de software integrales diseñadas específicamente para escuelas y centros educativos.",
  keywords: "software educativo, intranet escolar, gestión académica, administración escolar, plataforma educativa",
  generator: 'Next.js',
  openGraph: {
    title: "EDU21 - Software Educativo de Última Generación",
    description: "Soluciones de software integrales diseñadas específicamente para escuelas y centros educativos.",
    url: "https://edu21.vercel.app",
    siteName: "EDU21",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EDU21 - Software Educativo de Última Generación",
    description: "Soluciones de software integrales diseñadas específicamente para escuelas y centros educativos.",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {metadata.title && <meta property="og:title" content={metadata.title.toString()} />}
        {metadata.description && <meta property="og:description" content={metadata.description.toString()} />}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        {metadata.title && <meta name="twitter:title" content={metadata.title.toString()} />}
        {metadata.description && <meta name="twitter:description" content={metadata.description.toString()} />}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <StructuredData />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}



import './globals.css'