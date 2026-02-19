'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "./ui/badge";

const promotions = [
    { id: 1, title: "50% Bonus Airtime", description: "Exclusive for new users", imageUrl: "https://picsum.photos/seed/promo1/800/400", imageHint: "abstract neon", tag: "Limited" },
    { id: 2, title: "Night Owl Data", description: "Get 10GB for mid-night surfing", imageUrl: "https://picsum.photos/seed/promo2/800/400", imageHint: "night data", tag: "Hot" },
    { id: 3, title: "Invite & Earn GHS 10", description: "Shared the love with friends", imageUrl: "https://picsum.photos/seed/promo3/800/400", imageHint: "friends referral", tag: "Bonus" },
];

export default function PromoBanner() {
    return (
        <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
                {promotions.map(promo => (
                    <CarouselItem key={promo.id}>
                        <Card className="overflow-hidden border-white/5 rounded-[2rem] glass-card">
                            <CardContent className="p-0">
                                <div className="relative h-48 sm:h-56">
                                    <Image 
                                        src={promo.imageUrl}
                                        alt={promo.title}
                                        fill
                                        className="object-cover opacity-80"
                                        data-ai-hint={promo.imageHint}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"/>
                                    <div className="absolute inset-0 p-6 flex flex-col justify-center gap-2">
                                        <Badge variant="secondary" className="w-fit bg-primary/20 text-primary border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                                            {promo.tag}
                                        </Badge>
                                        <h3 className="font-headline text-2xl font-bold text-white max-w-[200px] leading-tight">{promo.title}</h3>
                                        <p className="text-sm text-gray-300 font-medium">{promo.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}