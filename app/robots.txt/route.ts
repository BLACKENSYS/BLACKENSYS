import { NextResponse } from "next/server"

export async function GET() {
  // Base URL of your website
  const baseUrl = "https://www.blackensys.com"

  // Create the robots.txt content
  const robotsTxt = `# www.robotstxt.org/

User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /super-admin/
Disallow: /api/
Disallow: /account/settings/
Disallow: /payment/

# Allow search engines to crawl these important paths
Allow: /sitemap.xml
Allow: /about
Allow: /features
Allow: /pricing
Allow: /blog
Allow: /contact

# Crawl delay for specific bots
User-agent: Googlebot
Crawl-delay: 1

User-agent: Bingbot
Crawl-delay: 2

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`

  // Return the robots.txt with the appropriate content type
  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
