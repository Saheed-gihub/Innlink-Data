'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle, Save } from "lucide-react";

const chartData = [
  { network: 'MTN', success: 98, failed: 2 },
  { network: 'Telecel', success: 95, failed: 5 },
  { network: 'AirtelTigo', success: 92, failed: 8 },
];

const chartConfig = {
  success: {
    label: 'Success',
    color: 'hsl(var(--primary))',
  },
  failed: {
    label: 'Failed',
    color: 'hsl(var(--destructive))',
  },
};

const initialStockData = [
    { type: 'BECE', stock: 1502, status: 'In Stock' },
    { type: 'WASSCE', stock: 894, status: 'In Stock' },
    { type: 'CSSPS', stock: 45, status: 'Low Stock' },
    { type: 'Nov/Dec', stock: 0, status: 'Out of Stock' },
];

export default function AdminPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
        toast({
            title: "Settings Updated",
            description: "System prices and margins have been updated successfully.",
        });
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold font-headline tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">System-wide monitoring and service management.</p>
        </div>
        <Badge variant="outline" className="w-fit border-primary/20 bg-primary/5 text-primary">
            Server Status: Operational
        </Badge>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold font-headline">GHS 1,234,567.89</p>
                <p className="text-xs text-green-500 font-medium mt-1">+12.5% from last month</p>
            </CardContent>
        </Card>
        <Card className="border-l-4 border-l-accent">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold font-headline">42,123</p>
                <p className="text-xs text-blue-500 font-medium mt-1">856 processed today</p>
            </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold font-headline">3,456</p>
                <p className="text-xs text-purple-500 font-medium mt-1">214 currently online</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 shadow-md">
          <CardHeader>
            <CardTitle>Network Health</CardTitle>
            <CardDescription>Success vs Failure rates across gateways (Real-time)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="network"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis axisLine={false} tickLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="success" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="failed" fill="var(--color-failed)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-md">
            <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>PIN Stock monitoring</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead className="text-right">Units</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialStockData.map(item => (
                            <TableRow key={item.type}>
                                <TableCell className="font-semibold">{item.type}</TableCell>
                                <TableCell className="text-right font-mono">{item.stock}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={item.status === 'Out of Stock' ? 'destructive' : 'secondary'}
                                    className={cn(
                                        item.status === 'Low Stock' && 'bg-amber-400/20 text-amber-600 border-amber-400/20',
                                        item.status === 'In Stock' && 'bg-green-500/20 text-green-600 border-green-500/20'
                                    )}
                                    >
                                        {item.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-primary/20">
          <CardHeader>
              <CardTitle>Revenue & Pricing Control</CardTitle>
              <CardDescription>Adjust market prices and platform margins</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                    <Label htmlFor="price-wassce">WASSCE Price (GHS)</Label>
                    <Input id="price-wassce" type="number" defaultValue="30.00" className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price-bece">BECE Price (GHS)</Label>
                    <Input id="price-bece" type="number" defaultValue="25.00" className="bg-muted/30" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="data-margin">Data Platform Margin (%)</Label>
                    <Input id="data-margin" type="number" defaultValue="5" className="bg-muted/30" />
                </div>
            </div>
            <div className="flex justify-end">
                <Button 
                    onClick={handleSaveChanges} 
                    disabled={isSaving}
                    className="gap-2 px-8 h-11"
                >
                    {isSaving ? <LoaderCircle className="animate-spin" /> : <Save className="h-4 w-4" />}
                    {isSaving ? 'Syncing...' : 'Save System Settings'}
                </Button>
            </div>
          </CardContent>
      </Card>

    </div>
  );
}
