'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

const promotions = [
    { id: 1, title: "50% Bonus on Airtime", description: "Top up GHS 20 or more and get 50% extra!", imageUrl: "https://picsum.photos/seed/promo1/600/300", imageHint: "promotion sale" },
    { id: 2, title: "Weekend Data Deal", description: "Get 5GB for just GHS 10. Valid this weekend only.", imageUrl: "https://picsum.photos/seed/promo2/600/300", imageHint: "data deal" },
    { id: 3, title: "Refer & Earn", description: "Invite a friend and you both get GHS 5 when they make their first purchase.", imageUrl: "https://picsum.photos/seed/promo3/600/300", imageHint: "referral bonus" },
];

export default function PromoBanner() {
    return (
        <Carousel opts={{ loop: true }}>
            <CarouselContent>
                {promotions.map(promo => (
                    <CarouselItem key={promo.id}>
                        <Card className="overflow-hidden border-none rounded-xl">
                            <CardContent className="p-0">
                                <div className="relative h-40">
                                    <Image 
                                        src={promo.imageUrl}
                                        alt={promo.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={promo.imageHint}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                                    <div className="absolute bottom-0 left-0 p-4 text-white">
                                        <h3 className="font-headline text-lg font-bold">{promo.title}</h3>
                                        <p className="text-sm">{promo.description}</p>
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
