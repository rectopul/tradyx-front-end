import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { asset } from "@/utils/helpers";
import Autoplay from "embla-carousel-autoplay";

const mockSlides = [
    asset("/assets/images/banners/coinrise_banner_correct.png"),
    asset("/assets/images/banners/coinrise_banner2.png"),
    asset("/assets/images/banners/coinrise_banner3.png"),
];

export function Slides() {
    return (
        <Carousel
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
            opts={{
                loop: true,
            }}
        >
            <CarouselContent>
                {mockSlides.map((slide, key) => (
                    <CarouselItem
                        className="rounded-md"
                        key={`slides-item${key}`}
                    >
                        <img
                            src={slide}
                            alt={`slide-${key}`}
                            className="rounded-md"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
