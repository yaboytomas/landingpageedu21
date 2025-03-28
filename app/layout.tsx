import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import StructuredData from "@/components/structured-data"

const inter = Inter({ subsets: ["latin"] })

// Use logo.png instead of favicon.png for better image size and quality
const siteUrl = "https://software.edu21.cl";
const imagePath = "/logo.png";
const imageUrl = `${siteUrl}${imagePath}`;

export const metadata: Metadata = {
  title: "EDU21 - Software Educativo de Última Generación",
  description: "Soluciones de software integrales diseñadas específicamente para escuelas y centros educativos.",
  keywords: "software educativo, intranet escolar, gestión académica, administración escolar, plataforma educativa",
  generator: 'Next.js',
  openGraph: {
    title: "EDU21 - Software Educativo de Última Generación",
    description: "Soluciones de software integrales diseñadas específicamente para escuelas y centros educativos.",
    url: siteUrl,
    siteName: "EDU21",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: imageUrl,
        width: 400,
        height: 400,
        alt: "EDU21 Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EDU21 - Software Educativo de Última Generación",
    description: "Soluciones de software integrales diseñadas específicamente para escuelas y centros educativos.",
    images: [imageUrl],
  },
  icons: {
    icon: [
      { url: "/favicon.png" }
    ],
    apple: "/favicon.png",
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
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        {metadata.title && <meta name="twitter:title" content={metadata.title.toString()} />}
        {metadata.description && <meta name="twitter:description" content={metadata.description.toString()} />}
        <meta name="twitter:image" content={imageUrl} />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="image_src" href={imageUrl} />
        <meta name="theme-color" content="#8B5CF6" />
        <StructuredData />
        
        {/* Google Tag Manager - DIRECT IMPLEMENTATION */}
        <script 
          dangerouslySetInnerHTML={{ 
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5TRFW6V7');`
          }}
        />
        
        {/* Google Analytics - DIRECT IMPLEMENTATION */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3CJFJ04Y5G"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3CJFJ04Y5G');
            `
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) - DIRECT IMPLEMENTATION */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5TRFW6V7"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`
          }}
        />
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