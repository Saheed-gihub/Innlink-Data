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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Hourglass, CreditCard, Wallet, Smartphone } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface PurchaseFormProps {
  service: Service;
  preselectedNetwork?: string | null;
}

export default function PurchaseForm({ service, preselectedNetwork }: PurchaseFormProps) {
  const [network, setNetwork] = useState<Network>('Unknown');
  const [processingState, setProcessingState] = useState<'idle' | 'processing' | 'queued' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [pin, setPin] = useState('');
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
  const isBills = service.type === 'bills';

  const formSchema = z.object({
    phone: service.requiresPhone ? z.string().min(10, "Phone number must be 10 digits.").max(10, "Phone number must be 10 digits.") : z.string().optional(),
    productId: !isAirtime ? z.string().min(1, "Please select an item.") : z.string().optional(),
    amount: (isAirtime || isBills) ? z.coerce.number().min(1, "Please enter a valid amount.") : z.number().optional(),
    paymentMethod: z.enum(['wallet', 'momo']),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
      productId: '',
      paymentMethod: 'wallet',
    },
  });

  const phoneValue = form.watch('phone');
  
  useEffect(() => {
    if (service.requiresPhone) {
      const detected = detectNetwork(phoneValue || '');
      if (detected !== network) {
        setNetwork(detected);
        form.setValue('productId', ''); // Reset selection on network change
      }
    }
  }, [phoneValue, service.requiresPhone, network, form]);


  const networkInfo = NETWORKS[network];
  const networkLogo = PlaceHolderImages.find(p => p.id === networkInfo?.logo);
  
  const productsToShow: Product[] = (service.networkProducts && network !== 'Unknown' && service.networkProducts[network])
    ? (service.networkProducts[network] as Product[])
    : service.products;


  const simulateTransaction = () => {
    setPin('');
    setProgress(0);
    setProcessingState('processing');
    
    // Simulate random network delay/queue (10% chance)
    const isQueued = Math.random() < 0.1; 
    
    if (isQueued) {
        setProcessingState('queued');
        toast({
            title: "Network Latency Detected",
            description: "High traffic on the provider network. Your request is queued.",
        });
        setTimeout(() => {
            onPurchaseSuccess();
            setProcessingState('idle');
        }, 5000);
        return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setProcessingState('success');
      
      let successMessage = "Transaction completed successfully!";
      if(service.type === 'results') {
        const generatedPin = `${Math.floor(1000 + Math.random() * 8999)}-${Math.floor(1000 + Math.random() * 8999)}-${Math.floor(1000 + Math.random() * 8999)}`;
        setPin(generatedPin);
        successMessage = "Result checker PIN delivered.";
      }

      toast({
        title: "Success!",
        description: successMessage,
      });

      // Auto-redirect after a few seconds
      setTimeout(() => {
        onPurchaseSuccess();
        setProcessingState('idle');
      }, service.type === 'results' ? 12000 : 3500);

    }, 2500);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    simulateTransaction();
  };

  if (processingState === 'processing') {
    return (
        <div className="text-center space-y-6 py-12">
            <div className="relative mx-auto w-24 h-24">
                <Hourglass className="h-24 w-24 text-primary animate-spin" />
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-bold font-headline">Processing Payment</h3>
                <p className="text-sm text-muted-foreground">Securing your connection to the gateway...</p>
            </div>
            <Progress value={progress} className="w-full max-w-xs mx-auto" />
        </div>
    )
  }

  if (processingState === 'success') {
    return (
        <div className="text-center space-y-6 py-12">
            <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-12 w-12 text-green-500 animate-bounce" />
            </div>
            <div className="space-y-2">
                <h3 className="font-headline text-3xl font-bold text-green-400">Paid Successfully</h3>
                <p className="text-muted-foreground">Your wallet has been debited.</p>
            </div>
            
            {pin && (
              <Alert className="text-left bg-primary/5 border-primary/20 max-w-sm mx-auto">
                <AlertTitle className="font-headline font-bold text-primary mb-2">Checker PIN Details</AlertTitle>
                <AlertDescription>
                    <div className="bg-background/80 p-3 rounded-md border border-primary/10 select-all">
                        <p className="font-mono text-xl font-bold text-center tracking-widest">{pin}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-3 italic text-center">
                        Redirecting to dashboard in 10s...
                    </p>
                </AlertDescription>
              </Alert>
            )}
            
            {!pin && <p className="text-sm text-muted-foreground">Redirecting to Home...</p>}
        </div>
    )
  }
  
    if (processingState === 'queued') {
    return (
        <div className="text-center space-y-6 py-12">
            <Hourglass className="h-20 w-20 text-amber-500 mx-auto animate-pulse" />
            <h3 className="font-headline text-2xl font-bold text-amber-400">Request Pending</h3>
            <div className="max-w-xs mx-auto text-muted-foreground text-sm">
                We've received your request. Due to network congestion, this may take a moment. We'll notify you when it's done.
            </div>
            <Button variant="outline" onClick={onPurchaseSuccess} className="mt-4">Back to Home</Button>
        </div>
    )
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {service.requiresPhone && (
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input placeholder="024 123 4567" {...field} type="tel" className="pl-10 h-12"/>
                  </FormControl>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center">
                    {network !== 'Unknown' && networkLogo ? (
                         <Image src={networkLogo.imageUrl} alt={networkInfo.name} width={24} height={24} className="rounded-full shadow-sm" data-ai-hint={networkLogo.imageHint} />
                    ) : (
                        <Smartphone className="h-5 w-5 text-muted-foreground/50" />
                    )}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {isAirtime || isBills ? (
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (GHS)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter amount" type="number" {...field} className="h-12" />
                </FormControl>
                {isAirtime && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {[5, 10, 20, 50].map(amt => (
                            <Button 
                                key={amt} 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                onClick={() => form.setValue('amount', amt)}
                                className="rounded-full"
                            >
                                GHS {amt}
                            </Button>
                        ))}
                    </div>
                )}
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
                <FormLabel>{service.type === 'results' ? 'Checker Type' : 'Select Bundle'}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12" disabled={network === 'Unknown' && service.requiresPhone}>
                      <SelectValue placeholder={network === 'Unknown' && service.requiresPhone ? 'Enter valid number' : `Choose ${service.type === 'results' ? 'item' : 'bundle'}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(productsToShow || []).map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        <div className="flex items-center justify-between min-w-[200px]">
                            <span>{product.name}</span>
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
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    <FormItem>
                      <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
                      <Label htmlFor="wallet" className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent/50 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer">
                        <Wallet className="mb-2 h-6 w-6 text-primary" />
                        <span className="font-semibold text-sm">Wallet</span>
                      </Label>
                    </FormItem>
                     <FormItem>
                      <RadioGroupItem value="momo" id="momo" className="peer sr-only" />
                      <Label htmlFor="momo" className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent/50 transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer">
                        <CreditCard className="mb-2 h-6 w-6 text-primary" />
                         <span className="font-semibold text-sm">MoMo</span>
                      </Label>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <Button type="submit" className="w-full font-bold text-lg h-14 bg-primary text-primary-foreground shadow-lg hover:shadow-primary/20 transition-all">
          Authorize GHS {form.watch('amount') || productsToShow.find(p => p.id === form.watch('productId'))?.price || 0}
        </Button>
      </form>
    </Form>
  );
}
