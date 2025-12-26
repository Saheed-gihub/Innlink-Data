'use client';

import type { Service } from '@/lib/networks';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import PurchaseForm from './purchase-form';

interface PurchaseSheetProps {
  service: Service;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function PurchaseSheet({ service, isOpen, onOpenChange }: PurchaseSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[90vh] overflow-y-auto">
        <SheetHeader className="text-center mb-6">
          <SheetTitle className="font-headline text-2xl">{service.title}</SheetTitle>
          <SheetDescription>{service.description}</SheetDescription>
        </SheetHeader>
        <div className="mx-auto max-w-md">
            <PurchaseForm service={service} onPurchaseSuccess={() => onOpenChange(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
