"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A mixed bar chart"

const chartData = [
  { browser: "sesionCompleta", services: 275, fill: "var(--cyan)" },
  { browser: "babyClass", services: 200, fill: "var(--yellow)" },
  { browser: "postVacuna", services: 187, fill: "var(--purple)" },
  { browser: "recienNacido", services: 173, fill: "var(--green)" },
  { browser: "babyCard", services: 90, fill: "var(--coral)" },
]

const chartConfig = {
  services: {
    label: "Servicios",
  },
  sesionCompleta: {
    label: "Sesion Completa",
    color: "hsl(var(--chart-1))",
  },
  babyClass: {
    label: "Baby Class",
    color: "hsl(var(--chart-2))",
  },
  postVacuna: {
    label: "Post Vacuna",
    color: "hsl(var(--chart-3))",
  },
  recienNacido: {
    label: "Recien Nacido",
    color: "hsl(var(--chart-4))",
  },
  babyCard: {
    label: "Baby Card",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function ServiceBabySpaChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Servicios</CardTitle>
        <CardDescription>2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="services" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="services" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
