import { NextResponse } from "next/server"

export async function GET() {
  // Base URL of your website
  const baseUrl = "https://www.blackensys.com"

  // Generate the current date in the format required for sitemaps
  const date = new Date().toISOString()

  // Define all your pages with their priorities and change frequencies
  const pages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/features", priority: "0.8", changefreq: "weekly" },
    { url: "/pricing", priority: "0.8", changefreq: "weekly" },
    { url: "/blog", priority: "0.8", changefreq: "daily" },
    { url: "/about", priority: "0.7", changefreq: "monthly" },
    { url: "/contact", priority: "0.7", changefreq: "monthly" },
    { url: "/terms", priority: "0.5", changefreq: "monthly" },
    { url: "/privacy", priority: "0.5", changefreq: "monthly" },
    { url: "/login", priority: "0.6", changefreq: "monthly" },
    { url: "/signup", priority: "0.6", changefreq: "monthly" },
    { url: "/videos", priority: "0.9", changefreq: "daily" },
    { url: "/cloud-storage", priority: "0.9", changefreq: "weekly" },
    { url: "/reels", priority: "0.9", changefreq: "daily" },
    { url: "/business", priority: "0.8", changefreq: "weekly" },
    { url: "/wallet", priority: "0.7", changefreq: "weekly" },
    { url: "/account", priority: "0.6", changefreq: "monthly" },
    { url: "/upload", priority: "0.7", changefreq: "monthly" },
    { url: "/file-manager", priority: "0.7", changefreq: "weekly" },
    { url: "/file-sharing", priority: "0.7", changefreq: "weekly" },
    { url: "/storage-usage", priority: "0.6", changefreq: "monthly" },
    { url: "/blackensys-private-limited", priority: "1.0", changefreq: "monthly" },
    { url: "/blackensys-limited", priority: "1.0", changefreq: "monthly" },
    { url: "/faq", priority: "0.7", changefreq: "weekly" },
  ]

  // Create the XML sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`

  // Add each page to the sitemap
  pages.forEach((page) => {
    sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  })

  // Close the sitemap
  sitemap += `</urlset>`

  // Return the XML sitemap with the appropriate content type
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
