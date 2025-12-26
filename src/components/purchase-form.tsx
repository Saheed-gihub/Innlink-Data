'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { Service, Network } from '@/lib/networks';
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
}

export default function PurchaseForm({ service }: PurchaseFormProps) {
  const [network, setNetwork] = useState<Network>('Unknown');
  const [processingState, setProcessingState] = useState<'idle' | 'processing' | 'queued' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [pin, setPin] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const onPurchaseSuccess = () => {
    router.push('/');
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    form.setValue('phone', newPhone);
    setNetwork(detectNetwork(newPhone));
  };

  const networkInfo = NETWORKS[network];
  const networkLogo = PlaceHolderImages.find(p => p.id === networkInfo?.logo);

  const simulateTransaction = () => {
    setPin('');
    setProgress(0);
    setProcessingState('processing');
    
    // Simulate API downtime for queue feature
    const isApiDown = Math.random() < 0.2; 
    
    if (isApiDown) {
        setProcessingState('queued');
        toast({
            title: "Network Busy",
            description: "The network is currently busy. Your request has been queued and will be processed shortly.",
            variant: "default",
        });
        setTimeout(() => {
            onPurchaseSuccess();
            setProcessingState('idle');
        }, 5000);
        return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setProcessingState('success');
      
      let successMessage = "Purchase successful!";
      if(service.type === 'results') {
        const generatedPin = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
        setPin(generatedPin);
        successMessage = "Result checker PIN generated successfully!";
      }

      toast({
        title: "Success!",
        description: successMessage,
      });

      setTimeout(() => {
        onPurchaseSuccess();
        setProcessingState('idle');
      }, service.type === 'results' ? 10000 : 3000);

    }, 2000);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    simulateTransaction();
  };

  if (processingState === 'processing') {
    return (
        <div className="text-center space-y-4 py-8">
            <p className="font-semibold text-primary">Processing your request...</p>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">Please wait while we complete your transaction.</p>
        </div>
    )
  }

  if (processingState === 'success') {
    return (
        <div className="text-center space-y-4 py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto animate-pulse" />
            <h3 className="font-headline text-2xl font-bold text-green-400">Transaction Successful</h3>
            {pin && (
              <Alert variant="default" className="text-left bg-primary/5 border-primary/20">
                <AlertTitle className="font-headline text-primary">Your Result Checker PIN</AlertTitle>
                <AlertDescription className="font-mono text-lg font-bold text-foreground tracking-widest">{pin}</AlertDescription>
                <p className="text-xs text-muted-foreground mt-2">PIN has been sent via SMS/Email and is shown here for 10 seconds.</p>
              </Alert>
            )}
        </div>
    )
  }
  
    if (processingState === 'queued') {
    return (
        <div className="text-center space-y-4 py-8">
            <Hourglass className="h-16 w-16 text-amber-500 mx-auto animate-spin" />
            <h3 className="font-headline text-2xl font-bold text-amber-400">Request Queued</h3>
            <p className="text-muted-foreground">We've received your request. It will be processed as soon as the network is available. You can safely close this window.</p>
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
                    <Input placeholder="024 123 4567" {...field} type="tel" onChange={handlePhoneChange} className="pl-10"/>
                  </FormControl>
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center">
                    {network !== 'Unknown' && networkLogo ? (
                         <Image src={networkLogo.imageUrl} alt={networkInfo.name} width={24} height={24} className="rounded-full" data-ai-hint={networkLogo.imageHint} />
                    ) : (
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
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
                  <Input placeholder="e.g., 10" type="number" {...field} />
                </FormControl>
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
                <FormLabel>{service.type === 'results' || service.type === 'bills' ? 'Select Item' : 'Select Bundle'}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select a ${service.type === 'results' ? 'card' : 'bundle'}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {service.products.map(product => (
                      <SelectItem key={product.id} value={product.id}>
                        <div className="flex justify-between w-full">
                            <span>{product.name}</span>
                            <span className="font-semibold text-primary/80 ml-4">GHS {product.price.toFixed(2)}</span>
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
              <FormItem className="space-y-3">
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    <FormItem>
                      <RadioGroupItem value="wallet" id="wallet" className="peer sr-only" />
                      <Label htmlFor="wallet" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <Wallet className="mb-3 h-6 w-6" />
                        Wallet
                      </Label>
                    </FormItem>
                     <FormItem>
                      <RadioGroupItem value="momo" id="momo" className="peer sr-only" />
                      <Label htmlFor="momo" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                        <CreditCard className="mb-3 h-6 w-6" />
                        Mobile Money
                      </Label>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <Button type="submit" className="w-full font-bold text-lg h-12 bg-primary text-primary-foreground hover:bg-primary/90">
          Pay Now
        </Button>
      </form>
    </Form>
  );
}
