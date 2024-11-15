'use client';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { GenderChart } from "./GenderChart";
import { ClientsMonthChart } from "./ClientsMonthChart";
import { ServiceBabySpaChart } from "./ServiceChart";
 
export function MainDashboard() {
  return (
    <Tabs defaultValue="babySpa" >
      <TabsList className="grid w-full grid-cols-4 max-w-[500px]">
        <TabsTrigger value="babySpa">Baby Spa</TabsTrigger>
        <TabsTrigger value="mommySpa">Mommy Spa</TabsTrigger>
        <TabsTrigger value="products">Productos</TabsTrigger>
        <TabsTrigger value="sales">Ventas</TabsTrigger>
      </TabsList>
      <TabsContent value="babySpa" className="flex gap-6">
        <GenderChart/>
        <ClientsMonthChart/>
        <ServiceBabySpaChart/>
      </TabsContent>
      <TabsContent value="mommySpa">
        <Card>
          <CardHeader>
            <CardTitle>Mommy Spa</CardTitle>
            <CardDescription>
              Reporte de Mommy Spa
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  )
}