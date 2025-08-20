"use client"

import { useEffect } from "react"
import Script from "next/script"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    ym: (...args: any[]) => void
  }
}

export default function Analytics() {
  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined") {
      // Google Analytics page view
      if (window.gtag) {
        window.gtag("config", "GA_MEASUREMENT_ID", {
          page_title: document.title,
          page_location: window.location.href,
        })
      }

      // Yandex Metrica page view
      if (window.ym) {
        window.ym(12345678, "hit", window.location.href)
      }
    }
  }, [])

  // Custom event tracking functions
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    // Google Analytics
    if (window.gtag) {
      window.gtag("event", eventName, parameters)
    }

    // Yandex Metrica
    if (window.ym) {
      window.ym(12345678, "reachGoal", eventName, parameters)
    }
  }

  // Track specific events
  useEffect(() => {
    const trackButtonClicks = () => {
      // Track ticket purchase button clicks
      document.querySelectorAll('[data-track="ticket-purchase"]').forEach((button) => {
        button.addEventListener("click", () => {
          trackEvent("ticket_purchase_click", {
            event_category: "engagement",
            event_label: "hero_cta",
          })
        })
      })

      // Track video play
      document.querySelectorAll('[data-track="video-play"]').forEach((button) => {
        button.addEventListener("click", () => {
          trackEvent("video_play", {
            event_category: "engagement",
            event_label: "trailer",
          })
        })
      })

      // Track treasure game interactions
      document.querySelectorAll('[data-track="treasure-game"]').forEach((element) => {
        element.addEventListener("click", () => {
          trackEvent("treasure_game_play", {
            event_category: "engagement",
            event_label: "mini_game",
          })
        })
      })
    }

    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", trackButtonClicks)
    } else {
      trackButtonClicks()
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", trackButtonClicks)
    }
  }, [])

  return (
    <>
      {/* Google Analytics */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: 'Шоу СЕКРЕТ - Главная',
            custom_map: {'custom_parameter': 'magic_show'}
          });
        `}
      </Script>

      {/* Yandex Metrica */}
      <Script id="yandex-metrica" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(12345678, "init", {
               clickmap:true,
               trackLinks:true,
               accurateTrackBounce:true,
               webvisor:true,
               ecommerce:"dataLayer"
          });
        `}
      </Script>

      {/* Yandex Metrica NoScript */}
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/12345678" style={{ position: "absolute", left: "-9999px" }} alt="" />
        </div>
      </noscript>
    </>
  )
}
