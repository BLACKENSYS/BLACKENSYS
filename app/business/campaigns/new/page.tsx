"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Trash2, Plus, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function NewCampaignPage() {
  const [campaignName, setCampaignName] = useState("")
  const [campaignObjective, setCampaignObjective] = useState("awareness")
  const [budget, setBudget] = useState(5000)
  const [dailyBudget, setDailyBudget] = useState(500)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [ageRange, setAgeRange] = useState([18, 65])
  const [genders, setGenders] = useState<string[]>([])
  const [locations, setLocations] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [creatives, setCreatives] = useState<any[]>([])
  const [currentStep, setCurrentStep] = useState(1)

  const handleAddCreative = () => {
    setCreatives([
      ...creatives,
      {
        id: Date.now().toString(),
        type: "image",
        title: "",
        description: "",
        mediaUrl: "",
        callToAction: {
          text: "Learn More",
          url: "",
        },
      },
    ])
  }

  const handleRemoveCreative = (id: string) => {
    setCreatives(creatives.filter((creative) => creative.id !== id))
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    // In a real app, this would submit the campaign data to the server
    console.log({
      name: campaignName,
      objective: campaignObjective,
      budget,
      dailyBudget,
      startDate,
      endDate,
      targeting: {
        ageRange,
        genders,
        locations,
        interests,
      },
      creatives,
    })
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-6">
        <Link
          href="/business/campaigns"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to campaigns
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mt-2">Create New Campaign</h1>
        <p className="text-muted-foreground mt-1">Set up your ad campaign in a few simple steps</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep >= 1
                ? "bg-primary text-primary-foreground"
                : "border border-muted-foreground text-muted-foreground"
            }`}
          >
            1
          </div>
          <div className={`h-px w-12 ${currentStep >= 2 ? "bg-primary" : "bg-muted-foreground"}`}></div>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep >= 2
                ? "bg-primary text-primary-foreground"
                : "border border-muted-foreground text-muted-foreground"
            }`}
          >
            2
          </div>
          <div className={`h-px w-12 ${currentStep >= 3 ? "bg-primary" : "bg-muted-foreground"}`}></div>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep >= 3
                ? "bg-primary text-primary-foreground"
                : "border border-muted-foreground text-muted-foreground"
            }`}
          >
            3
          </div>
          <div className={`h-px w-12 ${currentStep >= 4 ? "bg-primary" : "bg-muted-foreground"}`}></div>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              currentStep >= 4
                ? "bg-primary text-primary-foreground"
                : "border border-muted-foreground text-muted-foreground"
            }`}
          >
            4
          </div>
        </div>
        <div className="text-sm text-muted-foreground">Step {currentStep} of 4</div>
      </div>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>Provide basic information about your campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input
                id="campaign-name"
                placeholder="Enter campaign name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Campaign Objective</Label>
              <RadioGroup value={campaignObjective} onValueChange={setCampaignObjective}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="awareness" id="awareness" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="awareness" className="font-medium">
                        Brand Awareness
                      </Label>
                      <p className="text-sm text-muted-foreground">Increase visibility and reach for your brand</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="traffic" id="traffic" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="traffic" className="font-medium">
                        Website Traffic
                      </Label>
                      <p className="text-sm text-muted-foreground">Drive more visitors to your website</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="conversion" id="conversion" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="conversion" className="font-medium">
                        Conversions
                      </Label>
                      <p className="text-sm text-muted-foreground">Generate leads or sales for your business</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="budget">Total Budget (₹)</Label>
                  <p className="text-sm text-muted-foreground">Maximum amount you want to spend on this campaign</p>
                </div>
                <Input
                  id="budget"
                  type="number"
                  className="w-32 text-right"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="daily-budget">Daily Budget (₹)</Label>
                  <p className="text-sm text-muted-foreground">Maximum amount you want to spend per day</p>
                </div>
                <Input
                  id="daily-budget"
                  type="number"
                  className="w-32 text-right"
                  value={dailyBudget}
                  onChange={(e) => setDailyBudget(Number(e.target.value))}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/business/campaigns">Cancel</Link>
            </Button>
            <Button onClick={handleNext}>Next: Audience Targeting</Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Audience Targeting</CardTitle>
            <CardDescription>Define who you want to reach with your campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>
                    Age Range: {ageRange[0]} - {ageRange[1]}
                  </Label>
                </div>
                <Slider
                  defaultValue={ageRange}
                  min={13}
                  max={65}
                  step={1}
                  onValueChange={(value) => setAgeRange(value as [number, number])}
                  className="py-4"
                />
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="gender-male"
                      checked={genders.includes("male")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setGenders([...genders, "male"])
                        } else {
                          setGenders(genders.filter((g) => g !== "male"))
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="gender-male" className="font-normal">
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="gender-female"
                      checked={genders.includes("female")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setGenders([...genders, "female"])
                        } else {
                          setGenders(genders.filter((g) => g !== "female"))
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="gender-female" className="font-normal">
                      Female
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="gender-other"
                      checked={genders.includes("other")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setGenders([...genders, "other"])
                        } else {
                          setGenders(genders.filter((g) => g !== "other"))
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="gender-other" className="font-normal">
                      Other
                    </Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="locations">Locations</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input id="locations" placeholder="Enter locations (e.g., cities, states, countries)" />
                        <Info className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter multiple locations separated by commas</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Input id="interests" placeholder="Enter interests (e.g., technology, fashion, sports)" />
                        <Info className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter multiple interests separated by commas</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>Next: Ad Creatives</Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Ad Creatives</CardTitle>
            <CardDescription>Create the ads that will be shown to your audience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {creatives.length === 0 ? (
              <div className="flex flex-col items-center justify-center border border-dashed rounded-lg p-12 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No creatives added yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add at least one creative to continue with your campaign
                </p>
                <Button onClick={handleAddCreative}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Creative
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {creatives.map((creative, index) => (
                  <div key={creative.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Creative {index + 1}</h3>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveCreative(creative.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`creative-type-${creative.id}`}>Creative Type</Label>
                          <Select
                            value={creative.type}
                            onValueChange={(value) => {
                              const updatedCreatives = [...creatives]
                              updatedCreatives[index].type = value
                              setCreatives(updatedCreatives)
                            }}
                          >
                            <SelectTrigger id={`creative-type-${creative.id}`}>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="image">Image</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                              <SelectItem value="carousel">Carousel</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`creative-title-${creative.id}`}>Title</Label>
                          <Input
                            id={`creative-title-${creative.id}`}
                            placeholder="Enter ad title"
                            value={creative.title}
                            onChange={(e) => {
                              const updatedCreatives = [...creatives]
                              updatedCreatives[index].title = e.target.value
                              setCreatives(updatedCreatives)
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`creative-description-${creative.id}`}>Description</Label>
                          <Textarea
                            id={`creative-description-${creative.id}`}
                            placeholder="Enter ad description"
                            value={creative.description}
                            onChange={(e) => {
                              const updatedCreatives = [...creatives]
                              updatedCreatives[index].description = e.target.value
                              setCreatives(updatedCreatives)
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`creative-cta-text-${creative.id}`}>Call to Action Text</Label>
                          <Input
                            id={`creative-cta-text-${creative.id}`}
                            placeholder="E.g., Learn More, Shop Now"
                            value={creative.callToAction.text}
                            onChange={(e) => {
                              const updatedCreatives = [...creatives]
                              updatedCreatives[index].callToAction.text = e.target.value
                              setCreatives(updatedCreatives)
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`creative-cta-url-${creative.id}`}>Call to Action URL</Label>
                          <Input
                            id={`creative-cta-url-${creative.id}`}
                            placeholder="https://example.com/landing-page"
                            value={creative.callToAction.url}
                            onChange={(e) => {
                              const updatedCreatives = [...creatives]
                              updatedCreatives[index].callToAction.url = e.target.value
                              setCreatives(updatedCreatives)
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Upload Media</Label>
                          <div className="border border-dashed rounded-lg p-8 text-center">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Drag and drop your {creative.type === "video" ? "video" : "image"} here
                            </p>
                            <Button variant="outline" size="sm">
                              Browse Files
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Preview</Label>
                          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">Preview will appear here</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button onClick={handleAddCreative} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Creative
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={creatives.length === 0}>
              Next: Review & Launch
            </Button>
          </CardFooter>
        </Card>
      )}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Launch</CardTitle>
            <CardDescription>Review your campaign details before launching</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Campaign Name</h3>
                  <p className="font-medium">{campaignName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Objective</h3>
                  <p className="font-medium capitalize">{campaignObjective}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Budget</h3>
                  <p className="font-medium">₹{budget.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Daily Budget</h3>
                  <p className="font-medium">₹{dailyBudget.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Start Date</h3>
                  <p className="font-medium">{startDate || "Not specified"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">End Date</h3>
                  <p className="font-medium">{endDate || "Not specified"}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Audience Targeting</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm">
                      Age Range: {ageRange[0]} - {ageRange[1]}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">
                      Gender:{" "}
                      {genders.length > 0
                        ? genders.map((g) => g.charAt(0).toUpperCase() + g.slice(1)).join(", ")
                        : "All"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm">Locations: {locations.length > 0 ? locations.join(", ") : "All"}</p>
                  </div>
                  <div>
                    <p className="text-sm">Interests: {interests.length > 0 ? interests.join(", ") : "All"}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Creatives</h3>
                <p className="text-sm">{creatives.length} creative(s) added</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleSubmit}>Launch Campaign</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
