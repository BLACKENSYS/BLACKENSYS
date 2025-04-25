"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export default function BacklinkStrategyPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">BLACKENSYS Backlink Strategy</h1>
      <p className="text-muted-foreground mb-8">
        Comprehensive plan to build 100-10,000 quality backlinks to improve search rankings for "blackensys",
        "blackensys private limited", and "blackensys limited"
      </p>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tier1">Tier 1 Backlinks</TabsTrigger>
          <TabsTrigger value="tier2">Tier 2 Backlinks</TabsTrigger>
          <TabsTrigger value="tier3">Tier 3 Backlinks</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backlink Strategy Overview</CardTitle>
              <CardDescription>Multi-tiered approach to building quality backlinks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Our backlink strategy follows a tiered approach to build a natural and diverse backlink profile. We'll
                  focus on quality over quantity, but aim to build between 100-10,000 backlinks over time.
                </p>

                <h3 className="text-lg font-medium mt-4">Backlink Tiers:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Tier 1 (20%):</strong> High-authority, relevant websites including guest posts, resource
                    pages, business directories, and partnerships.
                  </li>
                  <li>
                    <strong>Tier 2 (30%):</strong> Medium-authority sites including niche directories, forums, Q&A
                    sites, and social bookmarking.
                  </li>
                  <li>
                    <strong>Tier 3 (50%):</strong> Lower-authority but still relevant sites including blog comments,
                    social media profiles, and web 2.0 properties.
                  </li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Target Keywords:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>blackensys</li>
                  <li>blackensys private limited</li>
                  <li>blackensys limited</li>
                  <li>BLACKENSYS</li>
                  <li>video streaming platform</li>
                  <li>unlimited cloud storage</li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Current Progress:</h3>
                <div className="space-y-4 mt-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tier 1 Backlinks</span>
                      <span className="text-sm text-muted-foreground">15/200 (7.5%)</span>
                    </div>
                    <Progress value={7.5} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tier 2 Backlinks</span>
                      <span className="text-sm text-muted-foreground">45/300 (15%)</span>
                    </div>
                    <Progress value={15} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tier 3 Backlinks</span>
                      <span className="text-sm text-muted-foreground">120/500 (24%)</span>
                    </div>
                    <Progress value={24} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tier1" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tier 1 Backlinks (High Authority)</CardTitle>
              <CardDescription>High-quality backlinks from authoritative sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Guest Posting (50-100 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Create high-quality content for relevant industry blogs and publications.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Website</TableHead>
                      <TableHead>Domain Authority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>TechCrunch</TableCell>
                      <TableCell>93</TableCell>
                      <TableCell>Outreach Pending</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Forbes Tech</TableCell>
                      <TableCell>95</TableCell>
                      <TableCell>Outreach Pending</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Entrepreneur India</TableCell>
                      <TableCell>89</TableCell>
                      <TableCell>In Progress</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>YourStory</TableCell>
                      <TableCell>78</TableCell>
                      <TableCell>Published</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Inc42</TableCell>
                      <TableCell>76</TableCell>
                      <TableCell>Outreach Pending</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-medium mt-6">Resource Page Link Building (30-50 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Find websites with resource pages related to video streaming, cloud storage, or content creation.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Website</TableHead>
                      <TableHead>Domain Authority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>CloudStorageAdvice.com</TableCell>
                      <TableCell>65</TableCell>
                      <TableCell>Link Added</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>VideoCreatorHub.com</TableCell>
                      <TableCell>58</TableCell>
                      <TableCell>Outreach Sent</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Follow Up
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>DigitalContentTools.org</TableCell>
                      <TableCell>62</TableCell>
                      <TableCell>Outreach Pending</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Contact
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-medium mt-6">Business Directories & Listings (20-30 links)</h3>
                <p className="text-muted-foreground mb-2">
                  List BLACKENSYS in high-quality business directories and review sites.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Directory</TableHead>
                      <TableHead>Domain Authority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Startup India</TableCell>
                      <TableCell>82</TableCell>
                      <TableCell>Listed</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>CrunchBase</TableCell>
                      <TableCell>90</TableCell>
                      <TableCell>Listed</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>G2</TableCell>
                      <TableCell>85</TableCell>
                      <TableCell>In Progress</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Complete
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Capterra</TableCell>
                      <TableCell>83</TableCell>
                      <TableCell>In Progress</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Complete
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Product Hunt</TableCell>
                      <TableCell>88</TableCell>
                      <TableCell>Scheduled</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-medium mt-6">Strategic Partnerships (10-20 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Partner with complementary businesses for mutual link exchanges and co-marketing.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tier2" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tier 2 Backlinks (Medium Authority)</CardTitle>
              <CardDescription>Medium-quality backlinks from relevant sources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Niche Directories (100-200 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Submit BLACKENSYS to industry-specific directories related to video streaming, cloud storage, and tech
                  startups.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Directory</TableHead>
                      <TableHead>Domain Authority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>CloudStorageDirectory.com</TableCell>
                      <TableCell>45</TableCell>
                      <TableCell>Listed</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>VideoStreamingTools.net</TableCell>
                      <TableCell>42</TableCell>
                      <TableCell>Submitted</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Check Status
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>IndianStartupHub.org</TableCell>
                      <TableCell>48</TableCell>
                      <TableCell>Listed</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-medium mt-6">Forums & Community Participation (100-300 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Actively participate in relevant forums and communities, providing value and naturally mentioning
                  BLACKENSYS where appropriate.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Forum/Community</TableHead>
                      <TableHead>Domain Authority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Reddit r/cloudStorage</TableCell>
                      <TableCell>95 (Reddit)</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Quora</TableCell>
                      <TableCell>91</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>IndiaStartups Forum</TableCell>
                      <TableCell>52</TableCell>
                      <TableCell>Pending</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Join
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-medium mt-6">Q&A Sites (50-100 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Answer questions related to video streaming and cloud storage on Q&A platforms.
                </p>

                <h3 className="text-lg font-medium mt-6">Social Bookmarking (50-100 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Submit content to social bookmarking sites to increase visibility and backlinks.
                </p>

                <h3 className="text-lg font-medium mt-6">Web 2.0 Properties (30-50 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Create content on Medium, LinkedIn, and other platforms that link back to BLACKENSYS.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tier3" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tier 3 Backlinks (Lower Authority)</CardTitle>
              <CardDescription>High-volume, lower authority backlinks for diversity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Media Profiles (50-100 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Create and maintain profiles on all relevant social media platforms.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platform</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Facebook</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Twitter</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>LinkedIn</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Instagram</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>YouTube</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <h3 className="text-lg font-medium mt-6">Blog Comments (200-500 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Leave thoughtful comments on relevant blogs with natural links back to BLACKENSYS.
                </p>

                <h3 className="text-lg font-medium mt-6">Profile Links (200-500 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Create profiles on various websites that allow profile links.
                </p>

                <h3 className="text-lg font-medium mt-6">Image Sharing Sites (50-100 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Share infographics and images on platforms like Pinterest, Imgur, etc.
                </p>

                <h3 className="text-lg font-medium mt-6">Document Sharing (50-100 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Share whitepapers, case studies, and presentations on document sharing sites.
                </p>

                <h3 className="text-lg font-medium mt-6">Video Descriptions (20-50 links)</h3>
                <p className="text-muted-foreground mb-2">
                  Include links in descriptions of videos posted on YouTube and other platforms.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backlink Building Schedule</CardTitle>
              <CardDescription>Timeline for implementing the backlink strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Month 1-2: Foundation (100-200 backlinks)</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Set up all social media profiles</li>
                  <li>Submit to top business directories</li>
                  <li>Create profiles on major forums and Q&A sites</li>
                  <li>Begin outreach for guest posting opportunities</li>
                  <li>Set up monitoring tools for backlink tracking</li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Month 3-4: Expansion (300-500 additional backlinks)</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Publish 5-10 guest posts on medium authority sites</li>
                  <li>Submit to niche directories</li>
                  <li>Increase forum participation</li>
                  <li>Begin blog commenting strategy</li>
                  <li>Create and share infographics</li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Month 5-6: Acceleration (500-1000 additional backlinks)</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Publish 10-15 guest posts on higher authority sites</li>
                  <li>Implement resource page link building</li>
                  <li>Expand to more niche directories</li>
                  <li>Increase social bookmarking activities</li>
                  <li>Create more Web 2.0 properties</li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Month 7-12: Scaling (1000-8000 additional backlinks)</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Continue all previous activities at a higher volume</li>
                  <li>Focus on strategic partnerships</li>
                  <li>Implement PR campaigns for high-authority mentions</li>
                  <li>Create viral content to attract natural backlinks</li>
                  <li>Analyze and refine strategy based on results</li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Ongoing Maintenance</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Monitor backlink health and disavow toxic links</li>
                  <li>Continue building new links at a sustainable pace</li>
                  <li>Update existing content to maintain link relevance</li>
                  <li>Analyze competitor backlinks for new opportunities</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backlink Tracking & Analysis</CardTitle>
              <CardDescription>Tools and methods for monitoring backlink performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tracking Tools</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Google Search Console:</strong> Monitor backlinks reported by Google
                  </li>
                  <li>
                    <strong>Ahrefs:</strong> Comprehensive backlink analysis and monitoring
                  </li>
                  <li>
                    <strong>SEMrush:</strong> Track backlink growth and competitor analysis
                  </li>
                  <li>
                    <strong>Moz Link Explorer:</strong> Analyze domain authority and link quality
                  </li>
                  <li>
                    <strong>Majestic:</strong> Evaluate Trust Flow and Citation Flow metrics
                  </li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Key Metrics to Track</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Total Backlinks:</strong> Overall number of backlinks
                  </li>
                  <li>
                    <strong>Referring Domains:</strong> Number of unique domains linking to the site
                  </li>
                  <li>
                    <strong>Domain Authority:</strong> Overall site authority
                  </li>
                  <li>
                    <strong>Link Quality:</strong> Metrics like Trust Flow, Citation Flow, etc.
                  </li>
                  <li>
                    <strong>Anchor Text Distribution:</strong> Ensure natural anchor text profile
                  </li>
                  <li>
                    <strong>Link Velocity:</strong> Rate of acquiring new links
                  </li>
                  <li>
                    <strong>Keyword Rankings:</strong> Position for target keywords
                  </li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Reporting Schedule</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Weekly:</strong> Quick check on new backlinks and rankings
                  </li>
                  <li>
                    <strong>Monthly:</strong> Comprehensive backlink analysis and strategy adjustment
                  </li>
                  <li>
                    <strong>Quarterly:</strong> In-depth review and long-term strategy planning
                  </li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Link Quality Assessment</h3>
                <p className="text-muted-foreground mb-2">
                  Each backlink will be evaluated based on the following criteria:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Relevance:</strong> How closely related the linking site is to our industry
                  </li>
                  <li>
                    <strong>Authority:</strong> Domain authority of the linking site
                  </li>
                  <li>
                    <strong>Traffic:</strong> Estimated traffic of the linking page
                  </li>
                  <li>
                    <strong>Placement:</strong> Position of the link on the page
                  </li>
                  <li>
                    <strong>Follow/Nofollow:</strong> Whether the link passes authority
                  </li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Toxic Link Monitoring</h3>
                <p className="text-muted-foreground mb-2">
                  Regularly monitor for potentially harmful backlinks and take action:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Identify spammy or low-quality links</li>
                  <li>Contact webmasters for removal when necessary</li>
                  <li>Create and maintain a disavow file for Google</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
