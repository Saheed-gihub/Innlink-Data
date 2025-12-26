'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const chartData = [
  { network: 'MTN', success: 98, failed: 2 },
  { network: 'Telecel', success: 95, failed: 5 },
  { network: 'AirtelTigo', success: 92, failed: 8 },
];

const chartConfig = {
  success: {
    label: 'Success',
    color: 'hsl(var(--chart-2))',
  },
  failed: {
    label: 'Failed',
    color: 'hsl(var(--destructive))',
  },
};

const stockData = [
    { type: 'BECE', stock: 1502, status: 'In Stock' },
    { type: 'WASSCE', stock: 894, status: 'In Stock' },
    { type: 'CSSPS', stock: 45, status: 'Low Stock' },
    { type: 'Nov/Dec', stock: 0, status: 'Out of Stock' },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your services and monitor performance.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
                <CardDescription>All-time revenue from sales.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold font-headline">GHS 1,234,567.89</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>Total transactions processed.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold font-headline">42,123</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Users active in the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold font-headline">3,456</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Network Success Rate (Last 24h)</CardTitle>
            <CardDescription>Real-time monitoring of transaction success rates per network.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="network"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="success" fill="var(--color-success)" radius={4} />
                <Bar dataKey="failed" fill="var(--color-failed)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Result Checker Stock</CardTitle>
                <CardDescription>Current inventory of result checker PINs.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Stock</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {stockData.map(item => (
                            <TableRow key={item.type}>
                                <TableCell className="font-medium">{item.type}</TableCell>
                                <TableCell className="text-right">{item.stock}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={item.status === 'Out of Stock' ? 'destructive' : item.status === 'Low Stock' ? 'secondary' : 'default'}
                                    className={item.status === 'Low Stock' ? 'bg-amber-400 text-black' : ''}
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

      <Card>
          <CardHeader>
              <CardTitle>Price Management</CardTitle>
              <CardDescription>Manually adjust prices for services. Changes are effective immediately.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                    <Label htmlFor="price-wassce">WASSCE Checker Price</Label>
                    <Input id="price-wassce" type="number" defaultValue="30.00" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price-bece">BECE Checker Price</Label>
                    <Input id="price-bece" type="number" defaultValue="25.00" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="data-margin">Data Bundle Margin (%)</Label>
                    <Input id="data-margin" type="number" defaultValue="5" />
                </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
      </Card>

    </div>
  );
}
