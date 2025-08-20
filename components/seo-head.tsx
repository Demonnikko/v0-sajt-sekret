"use client"

import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

export default function SEOHead({
  title = "Секрет - Иллюзионное шоу Дмитрия Костюка",
  description = "Погрузитесь в мир невозможного. Премиальное иллюзионное шоу, где реальность становится иллюзией. Купить билеты на шоу Секрет в Ярославле.",
  image = "/og-image.jpg",
  url = "https://secret-show.ru",
  type = "website",
}: SEOHeadProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Иллюзионное шоу СЕКРЕТ",
    description:
      "Премиальное иллюзионное шоу Дмитрия Костюка. 90 минут невозможного, где реальность становится иллюзией.",
    image: [
      "https://secret-show.ru/magic-show-trailer.png",
      "https://secret-show.ru/elegant-magician.png",
      "https://secret-show.ru/dmitry-portrait.png",
    ],
    startDate: "2024-12-20T19:00:00+03:00",
    endDate: "2024-12-20T20:30:00+03:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Театр Волшебство",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Театральная, 15",
        addressLocality: "Ярославль",
        addressCountry: "RU",
      },
    },
    offers: {
      "@type": "Offer",
      url: "https://secret-show.ru#booking",
      price: "1500",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      validFrom: "2024-01-01T00:00:00+03:00",
    },
    performer: {
      "@type": "Person",
      name: "Дмитрий Костюк",
      description: "Иллюзионист международного уровня с 15-летним опытом",
      image: "https://secret-show.ru/dmitry-portrait.png",
    },
    organizer: {
      "@type": "Organization",
      name: "Театр Волшебство",
      url: "https://secret-show.ru",
    },
  }

  return (
    <Head>
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Шоу СЕКРЕТ" />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@secret_show_ru" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Geo tags */}
      <meta name="geo.region" content="RU-YAR" />
      <meta name="geo.placename" content="Ярославль" />
      <meta name="geo.position" content="57.6261;39.8845" />
      <meta name="ICBM" content="57.6261, 39.8845" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://mc.yandex.ru" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    </Head>
  )
}
