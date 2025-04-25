"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Wallet,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  BarChart3,
  Download,
  Filter,
  Search,
  ChevronDown,
  LogOut,
  Settings,
  Users,
  Film,
  Cloud,
  LayoutDashboard,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock transaction data
const mockTransactions = [
  {
    id: "1",
    type: "deposit",
    amount: 5000,
    description: "Wallet top-up",
    status: "completed",
    date: "2023-06-10T14:30:00Z",
  },
  {
    id: "2",
    type: "ad_spend",
    amount: -1200,
    description: "Summer Sale Campaign",
    status: "completed",
    date: "2023-06-08T09:15:00Z",
  },
  {
    id: "3",
    type: "earnings",
    amount: 350,
    description: "Video monetization earnings",
    status: "completed",
    date: "2023-06-05T16:45:00Z",
  },
  {
    id: "4",
    type: "ad_spend",
    amount: -800,
    description: "Product Launch Campaign",
    status: "completed",
    date: "2023-06-01T11:20:00Z",
  },
  {
    id: "5",
    type: "withdrawal",
    amount: -2000,
    description: "Withdrawal to bank account",
    status: "completed",
    date: "2023-05-28T08:10:00Z",
  },
  {
    id: "6",
    type: "earnings",
    amount: 420,
    description: "Video monetization earnings",
    status: "completed",
    date: "2023-05-25T15:30:00Z",
  },
]

// Format date to a readable format
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Format amount with currency symbol
const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(Math.abs(amount))
}

export default function WalletPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Calculate wallet balance
  const walletBalance = mockTransactions.reduce((total, transaction) => total + transaction.amount, 0)

  // Filter transactions based on search query and filter type
  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-background border-r">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Wallet className="h-6 w-6 text-primary" />
            <span>Wallet</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/videos"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Film className="h-4 w-4" />
              <span>My Videos</span>
            </Link>
            <Link
              href="/cloud-storage"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Cloud className="h-4 w-4" />
              <span>Cloud Storage</span>
            </Link>
            <Link
              href="/wallet"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <Wallet className="h-4 w-4" />
              <span>Wallet</span>
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              <span>Account</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3 py-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg?height=36&width=36&text=U" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">john@example.com</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Button variant="outline" size="icon" className="md:hidden">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>
                <p className="text-muted-foreground">Manage your funds and transactions</p>
              </div>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href="/wallet/topup">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Funds
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/wallet/withdraw">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Withdraw
                  </Link>
                </Button>
              </div>
            </div>

            {/* Wallet Balance */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Available Balance</p>
                    <h2 className="text-4xl font-bold mt-1">{formatAmount(walletBalance)}</h2>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment Methods
                    </Button>
                    <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(
                      mockTransactions.filter((t) => t.type === "earnings").reduce((total, t) => total + t.amount, 0),
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-500">+12%</span> from last month
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ad Spend</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(
                      Math.abs(
                        mockTransactions.filter((t) => t.type === "ad_spend").reduce((total, t) => total + t.amount, 0),
                      ),
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-amber-500">+5%</span> from last month
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Withdrawals</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(
                      Math.abs(
                        mockTransactions
                          .filter((t) => t.type === "withdrawal")
                          .reduce((total, t) => total + t.amount, 0),
                      ),
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-red-500">-8%</span> from last month
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transactions */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold">Transaction History</h2>
                <div className="flex gap-2">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Transactions</SelectItem>
                      <SelectItem value="deposit">Deposits</SelectItem>
                      <SelectItem value="withdrawal">Withdrawals</SelectItem>
                      <SelectItem value="earnings">Earnings</SelectItem>
                      <SelectItem value="ad_spend">Ad Spend</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="border-b bg-muted/50 px-6 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="font-medium">Transaction</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">Amount</span>
                        <span className="font-medium">Date</span>
                        <span className="font-medium">Status</span>
                      </div>
                    </div>
                  </div>
                  <div className="divide-y">
                    {filteredTransactions.map((transaction) => (
                      <div key={transaction.id} className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                transaction.amount > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                              }`}
                            >
                              {transaction.amount > 0 ? (
                                <ArrowDownRight className="h-5 w-5" />
                              ) : (
                                <ArrowUpRight className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.type === "deposit"
                                  ? "Deposit"
                                  : transaction.type === "withdrawal"
                                    ? "Withdrawal"
                                    : transaction.type === "earnings"
                                      ? "Earnings"
                                      : "Ad Spend"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span
                              className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {transaction.amount > 0 ? "+" : "-"}
                              {formatAmount(Math.abs(transaction.amount))}
                            </span>
                            <span className="text-sm text-muted-foreground">{formatDate(transaction.date)}</span>
                            <Badge
                              variant="outline"
                              className={
                                transaction.status === "completed"
                                  ? "border-green-500 text-green-600"
                                  : transaction.status === "pending"
                                    ? "border-amber-500 text-amber-600"
                                    : "border-red-500 text-red-600"
                              }
                            >
                              {transaction.status === "completed"
                                ? "Completed"
                                : transaction.status === "pending"
                                  ? "Pending"
                                  : "Failed"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-6">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredTransactions.length} of {mockTransactions.length} transactions
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
