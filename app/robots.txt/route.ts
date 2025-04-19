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

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`

  // Return the robots.txt with the appropriate content type
  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
