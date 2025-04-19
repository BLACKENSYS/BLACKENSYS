"use client"

import { useState } from "react"
import { ArrowLeft, Send, Check, AlertCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ApiTestPage() {
  const [endpoint, setEndpoint] = useState("/api/test")
  const [method, setMethod] = useState("GET")
  const [requestBody, setRequestBody] = useState('{\n  "test": "value"\n}')
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSendRequest = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      }

      if (method !== "GET" && requestBody) {
        try {
          options.body = requestBody
        } catch (e) {
          setError("Invalid JSON in request body")
          setLoading(false)
          return
        }
      }

      const res = await fetch(endpoint, options)
      const data = await res.json()

      setResponse(data)
      setSuccess(`Request successful (${res.status} ${res.statusText})`)
    } catch (err) {
      setError(`Request failed: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" />
              <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
            </svg>
            <span>BLACKENSYS</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">API Test Tool</h1>
            <p className="text-muted-foreground">Test the BLACKENSYS API endpoints</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request</CardTitle>
                  <CardDescription>Configure your API request</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <Select value={method} onValueChange={setMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Input
                        placeholder="API Endpoint"
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Request Body (JSON)</label>
                    <Textarea
                      placeholder="Enter JSON request body"
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      className="font-mono text-sm h-40"
                      disabled={method === "GET"}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSendRequest} disabled={loading} className="w-full">
                    {loading ? "Sending..." : "Send Request"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Endpoints</CardTitle>
                  <CardDescription>Quick reference for testing</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="text-sm">
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => {
                          setEndpoint("/api/test")
                          setMethod("GET")
                        }}
                      >
                        GET /api/test
                      </Button>{" "}
                      - Test API connection
                    </li>
                    <li className="text-sm">
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => {
                          setEndpoint("/api/users")
                          setMethod("GET")
                        }}
                      >
                        GET /api/users
                      </Button>{" "}
                      - List all users
                    </li>
                    <li className="text-sm">
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => {
                          setEndpoint("/api/videos")
                          setMethod("GET")
                        }}
                      >
                        GET /api/videos
                      </Button>{" "}
                      - List all videos
                    </li>
                    <li className="text-sm">
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => {
                          setEndpoint("/api/files")
                          setMethod("GET")
                        }}
                      >
                        GET /api/files
                      </Button>{" "}
                      - List all files
                    </li>
                    <li className="text-sm">
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => {
                          setEndpoint("/api/analytics/user-activity")
                          setMethod("GET")
                        }}
                      >
                        GET /api/analytics/user-activity
                      </Button>{" "}
                      - Get user activity data
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {(error || success) && (
                <Alert variant={error ? "destructive" : "default"}>
                  {error ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                  <AlertTitle>{error ? "Error" : "Success"}</AlertTitle>
                  <AlertDescription>{error || success}</AlertDescription>
                </Alert>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Response</CardTitle>
                  <CardDescription>API response details</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="pretty">
                    <TabsList className="mb-4">
                      <TabsTrigger value="pretty">Pretty</TabsTrigger>
                      <TabsTrigger value="raw">Raw</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pretty">
                      <div className="bg-muted p-4 rounded-md overflow-auto max-h-96">
                        {response ? (
                          <pre className="text-sm font-mono">{JSON.stringify(response, null, 2)}</pre>
                        ) : (
                          <div className="text-muted-foreground text-center py-8">
                            No response yet. Send a request to see results.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="raw">
                      <div className="bg-muted p-4 rounded-md overflow-auto max-h-96">
                        {response ? (
                          <pre className="text-sm font-mono">{JSON.stringify(response)}</pre>
                        ) : (
                          <div className="text-muted-foreground text-center py-8">
                            No response yet. Send a request to see results.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>API usage information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Most API endpoints require authentication. For testing purposes, authentication is disabled in
                        this tool.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Rate Limits</h3>
                      <p className="text-sm text-muted-foreground">
                        API requests are limited to 100 requests per minute per IP address.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Response Codes</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          <span className="font-mono">200</span> - Success
                        </li>
                        <li>
                          <span className="font-mono">400</span> - Bad Request
                        </li>
                        <li>
                          <span className="font-mono">401</span> - Unauthorized
                        </li>
                        <li>
                          <span className="font-mono">404</span> - Not Found
                        </li>
                        <li>
                          <span className="font-mono">500</span> - Server Error
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/api-docs">View Full API Documentation</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
