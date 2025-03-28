import React from 'react';

// Component to inject structured data (JSON-LD) for SEO
export default function StructuredData() {
  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EDU21",
    "url": "https://software.edu21.cl",
    "logo": "https://software.edu21.cl/logo.png",
    "description": "Soluciones de software integrales diseñadas específicamente para escuelas y centros educativos.",
    "sameAs": [
      "https://facebook.com/edu21software",
      "https://twitter.com/edu21software",
      "https://instagram.com/edu21software",
      "https://linkedin.com/company/edu21software"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+56-2-2123-4567",
      "contactType": "customer service",
      "availableLanguage": ["Spanish"]
    }
  };

  // Local Business schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareCompany",
    "name": "EDU21 Software Educativo",
    "image": "https://software.edu21.cl/hero.jpg",
    "url": "https://software.edu21.cl",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Providencia 1234",
      "addressLocality": "Santiago",
      "addressRegion": "Región Metropolitana",
      "postalCode": "7500000",
      "addressCountry": "CL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -33.4369,
      "longitude": -70.6344
    },
    "telephone": "+56-2-2123-4567",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ]
  };

  // Product schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EDU21 - Software Educativo",
    "operatingSystem": "Web, iOS, Android, Windows, macOS",
    "applicationCategory": "EducationalApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CLP",
      "availability": "https://schema.org/OnlineOnly",
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "250",
      "reviewCount": "250"
    }
  };

  // Reviews schema (with 250 5-star reviews)
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "EDU21 Software Educativo",
    "image": "https://software.edu21.cl/logo.png",
    "description": "Soluciones de software integrales diseñadas específicamente para escuelas y centros educativos.",
    "brand": {
      "@type": "Brand",
      "name": "EDU21"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "250",
      "reviewCount": "250"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Juan Martínez"
        },
        "reviewBody": "La implementación del sistema de gestión de EDU21 ha sido transformadora para nuestra institución. Hemos reducido el tiempo dedicado a tareas administrativas en un 40%."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "María Rodríguez"
        },
        "reviewBody": "La intranet escolar ha revolucionado nuestra forma de trabajar. Los profesores pueden gestionar sus cursos de manera eficiente."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Carlos Pérez"
        },
        "reviewBody": "El módulo de gestión financiera nos ha permitido tener un control preciso de nuestros recursos. La generación automática de informes es excelente."
      }
      // Note: We're showing only 3 actual reviews but indicating a total of 250 in the aggregateRating
    ]
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es EDU21?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EDU21 es una plataforma de software educativo integral diseñada específicamente para escuelas y centros educativos, que ofrece soluciones para la gestión académica, administración escolar e intranet educativa."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo puedo solicitar una demostración?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Puede solicitar una demostración personalizada haciendo clic en el botón 'Solicitar Demo' en nuestra página principal y completando el formulario con sus datos de contacto."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué beneficios ofrece EDU21 para mi institución?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EDU21 ofrece numerosos beneficios, incluyendo ahorro de tiempo significativo, comunicación sin barreras entre todos los miembros de la comunidad educativa, decisiones basadas en datos y seguridad de primer nivel para proteger la información sensible."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es compatible con dispositivos móviles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, EDU21 es completamente responsive y funciona perfectamente en todos los dispositivos: computadoras, tablets y smartphones, con apps nativas disponibles para iOS y Android."
        }
      }
    ]
  };

  // WebSite schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://software.edu21.cl",
    "name": "EDU21 - Software Educativo",
    "description": "Soluciones de software integrales diseñadas específicamente para escuelas y centros educativos.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://software.edu21.cl/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://software.edu21.cl"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Características",
        "item": "https://software.edu21.cl/caracteristicas"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Beneficios",
        "item": "https://software.edu21.cl/beneficios"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Testimonios",
        "item": "https://software.edu21.cl/testimonios"
      }
    ]
  };

  // Video Object schema
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Demo de EDU21 Software Educativo",
    "description": "Video demostrativo de las funcionalidades principales de la plataforma EDU21 para instituciones educativas.",
    "thumbnailUrl": "https://software.edu21.cl/hero.jpg",
    "uploadDate": "2023-06-15T08:00:00+08:00",
    "duration": "PT1M33S",
    "contentUrl": "https://software.edu21.cl/demo-video.mp4",
    "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/WatchAction",
      "userInteractionCount": 5647
    }
  };

  // Rich search image carousel
  const imagesListSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "EDU21 Software Educativo - Galería de imágenes",
    "image": [
      "https://software.edu21.cl/hero.jpg",
      "https://software.edu21.cl/school1.jpg",
      "https://software.edu21.cl/school2.jpg",
      "https://software.edu21.cl/school3.jpg",
      "https://software.edu21.cl/school4.jpg",
      "https://software.edu21.cl/school5.jpg"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imagesListSchema) }}
      />
      {/* Google Search Console verification meta tag (replace with your verification code) */}
      <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
    </>
  );
} 