
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, Briefcase, PlusCircle, LineChart, BadgeCheck } from "lucide-react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useToast } from "@/hooks/use-toast";
import { DepositDialog } from "@/components/client/DepositDialog";
import { DepositReceiptDialog, type ReceiptData } from "@/components/client/DepositReceiptDialog";

const TOKEN_NAME = "CLT";
const TOKEN_SYMBOL = "CLT";
const PHP_TO_TOKEN_RATE = 1.00;

const transactions = [
  { id: "txn-c1", date: "2024-07-20", description: "Payment for Project Phoenix", amount: `-500 ${TOKEN_NAME}`, status: "Completed" },
  { id: "txn-c2", date: "2024-07-18", description: "Deposit from BDO", amount: `+1000 ${TOKEN_NAME}`, status: "Success" },
  { id: "txn-c3", date: "2024-07-15", description: "Payment for UI Kit Design", amount: `-150 ${TOKEN_NAME}`, status: "Completed" },
  { id: "txn-c4", date: "2024-07-10", description: "Payment for Logo Design", amount: `-200 ${TOKEN_NAME}`, status: "Completed" },
  { id: "txn-c5", date: "2024-07-05", description: "Deposit from GCash", amount: `+1000 ${TOKEN_NAME}`, status: "Success" },
];

const chartData = [
  { month: "January", spending: 1860 },
  { month: "February", spending: 2050 },
  { month: "March", spending: 2370 },
  { month: "April", spending: 1980 },
  { month: "May", spending: 2540 },
  { month: "June", spending: 3120 },
]

const chartConfig = {
  spending: {
    label: `Spending (${TOKEN_SYMBOL})`,
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function ClientWalletPage() {
  const [phpAmount, setPhpAmount] = useState("");
  const [balance, setBalance] = useState(2150);
  const [isDepositing, setIsDepositing] = useState(false);
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  const { toast } = useToast();
  const tokenValue = (parseFloat(phpAmount) || 0) * PHP_TO_TOKEN_RATE;
  
  const handleDepositRequest = () => {
    const amountToDeposit = parseFloat(phpAmount);
    if (!amountToDeposit || amountToDeposit <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid amount to deposit.",
      });
      return;
    }
    setShowDepositDialog(true);
  };
  
  const handleConfirmDeposit = (paymentMethod: string) => {
    setIsDepositing(true);
    // Simulate API call for deposit
    setTimeout(() => {
      const depositedPhpAmount = parseFloat(phpAmount) || 0;
      const receivedTokenAmount = depositedPhpAmount * PHP_TO_TOKEN_RATE;

      const newReceiptData = {
        amount: receivedTokenAmount,
        paymentMethod: paymentMethod,
        transactionId: `txn-${Math.random().toString(36).substring(2, 9)}`,
        date: new Date(),
        phpAmount: depositedPhpAmount,
      };
      
      setBalance((prev) => prev + receivedTokenAmount);
      setReceiptData(newReceiptData);
      setIsDepositing(false);
      setShowDepositDialog(false);
      setShowReceiptDialog(true);
      setPhpAmount("");
    }, 1500);
  };

  return (
    <>
      <DepositDialog
        open={showDepositDialog}
        onOpenChange={setShowDepositDialog}
        amount={parseFloat(phpAmount) || 0}
        rate={PHP_TO_TOKEN_RATE}
        onConfirm={handleConfirmDeposit}
        isDepositing={isDepositing}
      />
      {receiptData && (
        <DepositReceiptDialog
            open={showReceiptDialog}
            onOpenChange={setShowReceiptDialog}
            receipt={receiptData}
        />
      )}
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <Wallet className="w-8 h-8 text-accent" />
            E-Wallet
          </h1>
          <p className="text-muted-foreground">Manage your funds, deposits, and transaction history.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{balance.toLocaleString()} <span className="text-lg font-normal">{TOKEN_NAME}</span></div>
              <p className="text-xs text-muted-foreground">≈ ₱{balance.toLocaleString()}.00 PHP</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Lifetime Spending</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">850 <span className="text-lg font-normal">{TOKEN_NAME}</span></div>
              <p className="text-xs text-muted-foreground">On 3 completed projects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Funds for these are in escrow</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Add Funds</CardTitle>
                <CardDescription>Deposit PHP to receive {TOKEN_NAME} tokens in your wallet.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="php-amount">Amount (PHP)</Label>
                    <Input 
                      id="php-amount" 
                      type="number" 
                      placeholder="e.g., 1000" 
                      value={phpAmount}
                      onChange={(e) => setPhpAmount(e.target.value)}
                      disabled={isDepositing}
                    />
                </div>
                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground">You will receive</p>
                  <p className="text-2xl font-bold text-primary">{tokenValue.toFixed(2)} {TOKEN_NAME}</p>
                </div>
                <div className="text-sm text-muted-foreground text-center">
                  Conversion Rate: ₱{PHP_TO_TOKEN_RATE.toFixed(2)} = 1 {TOKEN_NAME}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleDepositRequest} disabled={isDepositing || !phpAmount}>
                  <PlusCircle className="mr-2 h-4 w-4"/> Add Funds to Wallet
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>A log of your recent wallet activity.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.slice(0, 3).map((txn) => (
                      <TableRow key={txn.id}>
                        <TableCell className="text-muted-foreground">{txn.date}</TableCell>
                        <TableCell className="font-medium">{txn.description}</TableCell>
                        <TableCell className={`text-right font-semibold ${txn.amount.startsWith('+') ? 'text-green-600' : 'text-foreground'}`}>
                          {txn.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending Chart</CardTitle>
            <CardDescription>Your spending in {TOKEN_NAME} for the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickFormatter={(value) => `${value}`}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideIndicator />}
                />
                <Bar dataKey="spending" fill="var(--color-spending)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
