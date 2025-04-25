import Head from "next/head"
import Script from "next/script"

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article" | "profile" | "video"
  twitterCard?: "summary" | "summary_large_image" | "app" | "player"
  keywords?: string[]
  author?: string
  noIndex?: boolean
  structuredData?: Record<string, any>
  companyName?: string
}

export function SEOOptimization({
  title,
  description,
  canonical,
  ogImage = "/images/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  keywords = ["blackensys", "blackensys private limited", "blackensys limited"],
  author = "BLACKENSYS Private Limited",
  noIndex = false,
  structuredData,
  companyName = "BLACKENSYS Private Limited",
}: SEOProps) {
  const siteUrl = "https://blackensys.com"
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : undefined
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`

  // Default structured data for organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyName,
    alternateName: ["BLACKENSYS", "BLACKENSYS Limited"],
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    sameAs: [
      "https://www.facebook.com/blackensys",
      "https://www.twitter.com/blackensys",
      "https://www.instagram.com/blackensys",
      "https://www.linkedin.com/company/blackensys",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9876543210",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Khorda",
      addressLocality: "Khorda",
      addressRegion: "Odisha",
      postalCode: "752050",
      addressCountry: "IN",
    },
    description: description,
  }

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
        {author && <meta name="author" content={author} />}

        {/* Canonical URL */}
        {fullCanonical && <link rel="canonical" href={fullCanonical} />}

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:image" content={fullOgImage} />
        {fullCanonical && <meta property="og:url" content={fullCanonical} />}
        <meta property="og:site_name" content={companyName} />

        {/* Twitter Card */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullOgImage} />

        {/* No index if specified */}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}

        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(finalStructuredData) }}
        />
      </Head>
    </>
  )
}
