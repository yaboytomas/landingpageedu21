'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { analytics } from '@/config/analytics'

// Get GA4 ID from config
const GA4_ID = analytics.ga4Id

// Extend window to include gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Skip if GA4 ID is not defined or in development
    if (!GA4_ID || GA4_ID === 'G-XXXXXXXXXX' || process.env.NODE_ENV === 'development') {
      return
    }

    // Send pageview when route changes
    const url = pathname + searchParams.toString()
    
    window.gtag('config', GA4_ID, {
      page_path: url,
    })
  }, [pathname, searchParams])

  // Skip if GA4 ID is not defined or in development
  if (!GA4_ID || GA4_ID === 'G-XXXXXXXXXX' || process.env.NODE_ENV === 'development') {
    return null
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
} 