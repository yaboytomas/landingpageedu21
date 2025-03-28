'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { analytics } from '@/config/analytics'

// Get GTM ID from config
const GTM_ID = analytics.gtmId

// Extend Window interface to include dataLayer
declare global {
  interface Window {
    dataLayer: any[]
  }
}

export function GoogleTagManagerScript() {
  const pathname = usePathname()

  useEffect(() => {
    // Send pageview event to GTM whenever the pathname changes
    if (pathname) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'pageview',
        page: pathname,
      })
    }
  }, [pathname])

  return (
    <>
      {/* Google Tag Manager - Head Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
    </>
  )
}

export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="gtm"
      />
    </noscript>
  )
} 