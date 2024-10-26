'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'

const salesData = [
    { name: 'Jan', total: 1200 },
    { name: 'Feb', total: 1900 },
    { name: 'Mar', total: 300 },
    { name: 'Apr', total: 500 },
    { name: 'May', total: 200 },
    { name: 'Jun', total: 300 },
]

const ordersData = [
    { name: 'Jan', total: 65 },
    { name: 'Feb', total: 59 },
    { name: 'Mar', total: 80 },
    { name: 'Apr', total: 81 },
    { name: 'May', total: 56 },
    { name: 'Jun', total: 55 },
]

export default function AnalyticsPage() {
    return (

        <div className="space-y-8 p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Total Sales", value: "$12,345", change: 20.1, icon: "💰" },
                    { title: "Total Orders", value: "1,234", change: 15, icon: "📦" },
                    { title: "Total Products", value: "567", change: 5, icon: "🏷️" },
                    { title: "Total Customers", value: "5,678", change: 7.2, icon: "👥" },
                ].map((item, index) => (
                    <Card key={index} className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                            <div className="text-2xl">{item.icon}</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                                {item.change > 0 ? (
                                    <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
                                ) : (
                                    <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
                                )}
                                <span className={item.change > 0 ? "text-green-500" : "text-red-500"}>
                                    {Math.abs(item.change)}%
                                </span>
                                <span className="ml-1">from last month</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Sales Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px] pt-4">
                        <ChartContainer config={{
                            sales: {
                                label: "Sales",
                                color: "hsl(var(--primary))",
                            },
                        }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salesData}>
                                    <XAxis
                                        dataKey="name"
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `Rs.${value}`}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">Order Trends</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px] pt-4">
                        <ChartContainer config={{
                            orders: {
                                label: "Orders",
                                color: "hsl(var(--secondary))",
                            },
                        }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={ordersData}>
                                    <XAxis
                                        dataKey="name"
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="hsl(var(--muted-foreground))"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line
                                        type="monotone"
                                        dataKey="total"
                                        stroke="hsl(var(--secondary))"
                                        strokeWidth={2}
                                        dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2 }}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>

    )
}