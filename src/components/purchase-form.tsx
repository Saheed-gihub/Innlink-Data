'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { Service, Network, Product } from '@/lib/networks';
import { detectNetwork, NETWORKS } from '@/lib/networks';
import { PlaceHolderImages } from '@/lib/placeholder-images';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Hourglass, CreditCard, Wallet, Smartphone, User, Users } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Switch } from './ui/switch';
import { cn } from '@/lib/utils';

interface PurchaseFormProps {
  service: Service;
  preselectedNetwork?: string | null;
}

export default function PurchaseForm({ service, preselectedNetwork }: PurchaseFormProps) {
  const [network, setNetwork] = useState<Network>('Unknown');
  const [recipientNetwork, setRecipientNetwork] = useState<Network>('Unknown');
  const [processingState, setProcessingState] = useState<'idle' | 'processing' | 'queued' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [generatedResult, setGeneratedResult] = useState('');
  const [isGifting, setIsGifting] = useState(false);
  
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (preselectedNetwork) {
      setNetwork(preselectedNetwork as Network);
    }
  }, [preselectedNetwork]);

  const onPurchaseSuccess = () => {
    router.push('/dashboard');
  };

  const isAirtime = service.type === 'airtime';
  const isCashOut = service.type === 'airtime-to-cash';
  const isBills = service.type === 'bills';
  const isData = service.type === 'data';

  const formSchema = z.object({
    phone: service.requiresPhone ? z.string().min(10, "10 digits required").max(10, "10 digits required") : z.string().optional(),
    recipientPhone: (isData || isAirtime) && isGifting ? z.string().min(10, "10 digits required").max(10, "10 digits required") : z.string().optional(),
    productId: (!isAirtime && !isCashOut) ? z.string().min(1, "Selection required") : z.string().optional(),
    amount: (isAirtime || isBills || isCashOut) ? z.coerce.number().min(1, "Min GHS 1") : z.number().optional(),
    paymentMethod: z.enum(['wallet', 'momo']),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      recipientPhone: '',
      productId: '',
      paymentMethod: 'wallet',
    },
  });

  const phoneValue = form.watch('phone');
  const recipientPhoneValue = form.watch('recipientPhone');
  
  useEffect(() => {
    if (service.requiresPhone) {
      setNetwork(detectNetwork(phoneValue || ''));
    }
  }, [phoneValue, service.requiresPhone]);

  useEffect(() => {
    if (isGifting) {
      setRecipientNetwork(detectNetwork(recipientPhoneValue || ''));
    }
  }, [recipientPhoneValue, isGifting]);


  const networkInfo = NETWORKS[network];
  const networkLogo = PlaceHolderImages.find(p => p.id === networkInfo?.logo);
  const recipientNetworkInfo = NETWORKS[recipientNetwork];
  const recipientLogo = PlaceHolderImages.find(p => p.id === recipientNetworkInfo?.logo);
  
  const productsToShow: Product[] = (service.networkProducts && network !== 'Unknown' && service.networkProducts[network])
    ? service.networkProducts[network]
    : service.products;


  const simulateTransaction = () => {
    setGeneratedResult('');
    setProgress(0);
    setProcessingState('processing');
    
    const isQueued = Math.random() < 0.1; 
    
    if (isQueued) {
        setProcessingState('queued');
        toast({
            title: "Network Busy",
            description: "Provider gateway is slow. We'll queue your request.",
        });
        setTimeout(() => {
            onPurchaseSuccess();
            setProcessingState('idle');
        }, 5000);
        return;
    }

    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 15, 95));
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setProcessingState('success');
      
      let successMsg = "Paid successfully!";
      
      if(service.type === 'results') {
        const pin = `CHECK-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
        setGeneratedResult(pin);
        successMsg = "Checker PIN delivered!";
      } else if (service.type === 'tickets') {
        const ticketId = `TKT-${Math.random().toString(36).substring(7).toUpperCase()}`;
        setGeneratedResult(ticketId);
        successMsg = "Ticket generated!";
      }

      toast({ title: "Success", description: successMsg });

      setTimeout(() => {
        onPurchaseSuccess();
        setProcessingState('idle');
      }, generatedResult ? 15000 : 3000);

    }, 2800);
  };

  if (processingState === 'processing') {
    return (
        <div className="text-center space-y-8 py-16 animate-pulse">
            <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Hourglass className="h-12 w-12 text-primary animate-spin" />
            </div>
            <div className="space-y-3">
                <h3 className="text-2xl font-bold font-headline">Processing...</h3>
                <p className="text-muted-foreground text-sm">Talking to {network !== 'Unknown' ? network : 'gateway'}...</p>
            </div>
            <Progress value={progress} className="h-3 w-full max-w-xs mx-auto" />
        </div>
    )
  }

  if (processingState === 'success') {
    return (
        <div className="text-center space-y-8 py-16">
            <div className="h-24 w-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto shadow-xl border border-green-500/20">
                <CheckCircle className="h-14 w-14 text-green-500 animate-bounce" />
            </div>
            <div className="space-y-2">
                <h3 className="font-headline text-3xl font-bold text-green-400">All Set!</h3>
                <p className="text-muted-foreground">Transaction complete.</p>
            </div>
            
            {generatedResult && (
              <Card className="text-left bg-primary/5 border-primary/20 max-w-sm mx-auto overflow-hidden">
                <div className="p-5 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary/70">Your Digital Code</p>
                    <div className="bg-card p-5 rounded-2xl border border-primary/10 select-all shadow-inner">
                        <p className="font-mono text-2xl font-bold text-center tracking-[0.2em]">{generatedResult}</p>
                    </div>
                </div>
                <div className="bg-primary/10 p-3 text-center">
                   <p className="text-[10px] font-bold text-primary uppercase">Auto-Redirect in 15s</p>
                </div>
              </Card>
            )}
            
            {!generatedResult && <Button onClick={onPurchaseSuccess} variant="outline" className="rounded-full">Finish</Button>}
        </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(simulateTransaction)} className="space-y-8">
        
        {(isData || isAirtime) && (
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", isGifting ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary")}>
                        {isGifting ? <Users className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </div>
                    <div>
                        <p className="text-sm font-bold">{isGifting ? "Gifting to Friend" : "Buy for Myself"}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Toggle Option</p>
                    </div>
                </div>
                <Switch checked={isGifting} onCheckedChange={setIsGifting} />
            </div>
        )}

        <div className="space-y-6">
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>{isCashOut ? "Phone with Airtime" : "Your Phone Number"}</FormLabel>
                    <div className="relative">
                    <FormControl>
                        <Input placeholder="024 123 4567" {...field} type="tel" className="pl-12 h-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-primary/40 text-lg"/>
                    </FormControl>
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        {network !== 'Unknown' && networkLogo ? (
                            <Image src={networkLogo.imageUrl} alt={network} width={28} height={28} className="rounded-full shadow-sm" />
                        ) : (
                            <Smartphone className="h-6 w-6 text-muted-foreground/30" />
                        )}
                    </div>
                    </div>
                    <FormMessage />
                </FormItem>
                )}
            />

            {isGifting && (
                 <FormField
                    control={form.control}
                    name="recipientPhone"
                    render={({ field }) => (
                    <FormItem className="animate-in slide-in-from-top-4 duration-300">
                        <FormLabel>Friend's Phone Number</FormLabel>
                        <div className="relative">
                        <FormControl>
                            <Input placeholder="050 987 6543" {...field} type="tel" className="pl-12 h-14 rounded-2xl bg-muted/30 border-none focus-visible:ring-accent/40 text-lg"/>
                        </FormControl>
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                            {recipientNetwork !== 'Unknown' && recipientLogo ? (
                                <Image src={recipientLogo.imageUrl} alt={recipientNetwork} width={28} height={28} className="rounded-full shadow-sm" />
                            ) : (
                                <Users className="h-6 w-6 text-muted-foreground/30" />
                            )}
                        </div>
                        </div>
                        <FormDescription className="text-[10px] font-bold uppercase tracking-wider text-accent/70">
                            Bundles will be sent directly to this number.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            )}
        </div>

        {isAirtime || isBills || isCashOut ? (
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (GHS)</FormLabel>
                <FormControl>
                  <Input placeholder="0.00" type="number" {...field} className="h-14 text-2xl font-bold bg-muted/30 border-none rounded-2xl" />
                </FormControl>
                {isCashOut && <FormDescription className="text-xs">Converting Airtime has a 10% processing fee.</FormDescription>}
                <div className="flex flex-wrap gap-2 mt-4">
                    {[5, 10, 20, 50, 100].map(amt => (
                        <Button key={amt} type="button" variant="outline" size="sm" onClick={() => form.setValue('amount', amt)} className="rounded-full border-primary/20 hover:bg-primary/10 h-10 px-6 font-bold">
                            GHS {amt}
                        </Button>
                    ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selection</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-14 rounded-2xl bg-muted/30 border-none px-6" disabled={network === 'Unknown' && service.requiresPhone}>
                      <SelectValue placeholder={network === 'Unknown' && service.requiresPhone ? 'Enter your number first' : 'Select a package'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-2xl border-white/5 bg-card/90 backdrop-blur-xl">
                    {productsToShow.map(product => (
                      <SelectItem key={product.id} value={product.id} className="rounded-xl my-1 focus:bg-primary/10">
                        <div className="flex items-center justify-between w-[260px] sm:w-[320px]">
                            <span className="font-semibold">{product.name}</span>
                            <span className="font-bold text-primary">GHS {product.price.toFixed(2)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel>Payment Provider</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                    <FormItem>
                      <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
                      <Label htmlFor="wallet" className="flex flex-col items-center justify-center rounded-2xl border-2 border-muted/50 bg-popover/50 p-6 hover:bg-primary/5 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer text-center">
                        <Wallet className="mb-3 h-8 w-8 text-primary" />
                        <span className="font-bold text-sm">Main Wallet</span>
                        <span className="text-[10px] text-muted-foreground mt-1">Balance: GHS 125.50</span>
                      </Label>
                    </FormItem>
                     <FormItem>
                      <RadioGroupItem value="momo" id="momo" className="peer sr-only" />
                      <Label htmlFor="momo" className="flex flex-col items-center justify-center rounded-2xl border-2 border-muted/50 bg-popover/50 p-6 hover:bg-accent/5 hover:border-accent/40 transition-all peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 cursor-pointer text-center">
                        <CreditCard className="mb-3 h-8 w-8 text-accent" />
                         <span className="font-bold text-sm">Mobile Money</span>
                         <span className="text-[10px] text-muted-foreground mt-1">Direct Prompt</span>
                      </Label>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <Button type="submit" className="w-full font-bold text-xl h-16 rounded-3xl bg-primary text-primary-foreground shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
          Authorize GHS {form.watch('amount') || productsToShow.find(p => p.id === form.watch('productId'))?.price || 0}
        </Button>
      </form>
    </Form>
  );
}