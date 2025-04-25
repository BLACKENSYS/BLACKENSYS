"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function SEOStrategyPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">BLACKENSYS SEO Strategy Dashboard</h1>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="onpage">On-Page SEO</TabsTrigger>
          <TabsTrigger value="technical">Technical SEO</TabsTrigger>
          <TabsTrigger value="content">Content Strategy</TabsTrigger>
          <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Implementation Progress</CardTitle>
              <CardDescription>Overall progress of SEO implementation for BLACKENSYS</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">On-Page SEO</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Technical SEO</span>
                    <span className="text-sm text-muted-foreground">90%</span>
                  </div>
                  <Progress value={90} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Content Strategy</span>
                    <span className="text-sm text-muted-foreground">70%</span>
                  </div>
                  <Progress value={70} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Backlink Building</span>
                    <span className="text-sm text-muted-foreground">45%</span>
                  </div>
                  <Progress value={45} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Target Keywords Performance</CardTitle>
                <CardDescription>Current ranking for primary keywords</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>blackensys</span>
                    <span className="text-green-500 font-medium">Position 1</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>blackensys private limited</span>
                    <span className="text-green-500 font-medium">Position 2</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>blackensys limited</span>
                    <span className="text-yellow-500 font-medium">Position 8</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>video streaming cloud storage</span>
                    <span className="text-yellow-500 font-medium">Position 12</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>unlimited cloud storage india</span>
                    <span className="text-yellow-500 font-medium">Position 15</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Action Items</CardTitle>
                <CardDescription>Priority tasks to improve rankings</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Create more content targeting "blackensys limited"</span>
                    <Button size="sm" variant="outline">
                      Assign
                    </Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Optimize image alt texts across the site</span>
                    <Button size="sm" variant="outline">
                      Assign
                    </Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Build more quality backlinks</span>
                    <Button size="sm" variant="outline">
                      Assign
                    </Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Improve page load speed on mobile</span>
                    <Button size="sm" variant="outline">
                      Assign
                    </Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Create FAQ content for voice search</span>
                    <Button size="sm" variant="outline">
                      Assign
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Target Keywords Strategy</CardTitle>
              <CardDescription>Primary and secondary keywords for BLACKENSYS</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Primary Keywords</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>blackensys</li>
                    <li>blackensys private limited</li>
                    <li>blackensys limited</li>
                    <li>blackensys video streaming</li>
                    <li>blackensys cloud storage</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Secondary Keywords</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>unlimited cloud storage india</li>
                    <li>video streaming platform india</li>
                    <li>content creation platform</li>
                    <li>monetize video content</li>
                    <li>secure cloud storage</li>
                    <li>video sharing platform</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Long-tail Keywords</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>how to monetize videos on blackensys</li>
                    <li>blackensys unlimited cloud storage pricing</li>
                    <li>blackensys vs youtube for content creators</li>
                    <li>is blackensys cloud storage secure</li>
                    <li>blackensys business plan features</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onpage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>On-Page SEO Checklist</CardTitle>
              <CardDescription>Optimization tasks for each page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Title Tags</h3>
                  <p className="text-muted-foreground mb-2">
                    All pages should have unique title tags that include the primary keyword and the brand name.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Homepage: "BLACKENSYS - Video Streaming & Unlimited Cloud Storage Platform"</li>
                    <li>About: "About BLACKENSYS Private Limited | Video & Cloud Storage Solutions"</li>
                    <li>Features: "BLACKENSYS Features | Video Streaming & Cloud Storage Solutions"</li>
                    <li>Pricing: "BLACKENSYS Pricing Plans | Video & Storage Solutions"</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Meta Descriptions</h3>
                  <p className="text-muted-foreground mb-2">
                    Each page should have a unique meta description under 160 characters that includes the primary
                    keyword.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Header Tags</h3>
                  <p className="text-muted-foreground mb-2">
                    Use H1, H2, and H3 tags properly with keywords naturally incorporated.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">URL Structure</h3>
                  <p className="text-muted-foreground mb-2">
                    Keep URLs short, descriptive, and include target keywords when relevant.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Image Optimization</h3>
                  <p className="text-muted-foreground mb-2">
                    All images should have descriptive file names and alt text that includes relevant keywords.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Internal Linking</h3>
                  <p className="text-muted-foreground mb-2">
                    Create a logical internal linking structure that helps users and search engines navigate the site.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical SEO Implementation</CardTitle>
              <CardDescription>Technical optimizations for search engines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Structured Data</h3>
                  <p className="text-muted-foreground mb-2">Implement JSON-LD structured data for:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Organization (Homepage)</li>
                    <li>FAQPage (FAQ page)</li>
                    <li>Article (Blog posts)</li>
                    <li>Product (Pricing plans)</li>
                    <li>VideoObject (Video pages)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">XML Sitemap</h3>
                  <p className="text-muted-foreground mb-2">
                    Maintain an up-to-date XML sitemap at /sitemap.xml that includes all important pages.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Robots.txt</h3>
                  <p className="text-muted-foreground mb-2">
                    Configure robots.txt to guide search engines on what to crawl and what to ignore.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Canonical Tags</h3>
                  <p className="text-muted-foreground mb-2">
                    Implement canonical tags to prevent duplicate content issues.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Mobile Optimization</h3>
                  <p className="text-muted-foreground mb-2">
                    Ensure the site is fully responsive and passes Google's mobile-friendly test.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Page Speed</h3>
                  <p className="text-muted-foreground mb-2">
                    Optimize page load times by compressing images, minifying CSS/JS, and leveraging browser caching.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">HTTPS</h3>
                  <p className="text-muted-foreground mb-2">
                    Ensure the entire site is served over HTTPS with a valid SSL certificate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Strategy</CardTitle>
              <CardDescription>Content plan to improve SEO rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Blog Content Calendar</h3>
                  <p className="text-muted-foreground mb-2">Regular blog posts targeting key search terms:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"How BLACKENSYS Private Limited is Revolutionizing Video Streaming"</li>
                    <li>"5 Ways BLACKENSYS Limited Helps Content Creators Monetize Their Work"</li>
                    <li>"BLACKENSYS vs Competitors: Which Cloud Storage Solution is Right for You?"</li>
                    <li>"The Ultimate Guide to Secure Cloud Storage with BLACKENSYS"</li>
                    <li>"How BLACKENSYS Private Limited Was Founded: Our Journey"</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Video Content</h3>
                  <p className="text-muted-foreground mb-2">
                    Create and optimize video content for YouTube and embedding on the site:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"BLACKENSYS Platform Tutorial"</li>
                    <li>"How to Maximize Your BLACKENSYS Cloud Storage"</li>
                    <li>"BLACKENSYS Private Limited: Our Story"</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Case Studies</h3>
                  <p className="text-muted-foreground mb-2">
                    Develop detailed case studies of successful BLACKENSYS users:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>"How Creator X Grew Their Audience by 300% with BLACKENSYS"</li>
                    <li>"Business Success Story: Company Y's Experience with BLACKENSYS"</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">FAQ Content</h3>
                  <p className="text-muted-foreground mb-2">
                    Expand FAQ content to target long-tail keywords and voice search queries.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backlinks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backlink Strategy</CardTitle>
              <CardDescription>Plan for building quality backlinks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Guest Posting</h3>
                  <p className="text-muted-foreground mb-2">
                    Target tech and business blogs for guest posting opportunities:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>TechCrunch</li>
                    <li>Entrepreneur India</li>
                    <li>YourStory</li>
                    <li>Inc42</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Industry Directories</h3>
                  <p className="text-muted-foreground mb-2">
                    List BLACKENSYS in relevant tech and business directories:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Startup India</li>
                    <li>CrunchBase</li>
                    <li>Product Hunt</li>
                    <li>G2</li>
                    <li>Capterra</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">PR Outreach</h3>
                  <p className="text-muted-foreground mb-2">
                    Create newsworthy content and reach out to tech publications:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Press releases for major product updates</li>
                    <li>Founder interviews</li>
                    <li>Industry reports and data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Content Partnerships</h3>
                  <p className="text-muted-foreground mb-2">
                    Collaborate with complementary businesses for content exchanges.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Social Media Profiles</h3>
                  <p className="text-muted-foreground mb-2">
                    Maintain active profiles on all major social platforms with consistent NAP information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
