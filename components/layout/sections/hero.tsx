"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const carouselImages = [
  {
    src: "/hero-image-family-dark1.png",
    alt: "Modern family tree design",
    title: "Modern Design",
  },
  {
    src: "/hero-image-family-dark2.png",
    alt: "Classic family tree layout",
    title: "Classic Layout",
  },
  {
    src: "/hero-image-family-light1.png",
    alt: "Minimalist family tree template",
    title: "Minimalist Template",
  },
];

export const HeroSection = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > 50;
    if (isSwipe) {
      if (distance > 0) nextSlide();
      else prevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (!isLoaded) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(0);
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center">
      <div className="container px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Hero content */}
        <div className="text-center space-y-6 sm:space-y-8 mb-8 sm:mb-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#D247BF] to-primary rounded-full blur opacity-20" />
            <Badge
              variant="outline"
              className="text-sm py-2 relative bg-background/80 backdrop-blur-sm border-primary/20"
            >
              <span className="mr-2 text-primary">
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                  New
                </Badge>
              </span>
              <span> Create your family&apos;s legacy today! </span>
            </Badge>
          </div>

          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Create Your <br />
              <span className="relative">
                <span className="relative text-transparent bg-gradient-to-r from-primary via-[#D247BF] to-primary bg-clip-text">
                  Family&apos;s
                </span>
              </span>{" "}
              Legacy
            </h1>
          </div>

          <p className="max-w-md mx-auto text-base sm:text-lg md:text-xl text-muted-foreground">
            Design and download personalized family trees with our intuitive
            online platform.
          </p>

          <Button className="px-6 sm:px-8 py-2 sm:py-4 font-bold text-base sm:text-lg bg-gradient-to-r from-primary to-[#D247BF] hover:opacity-90 group">
            Create Your Family Tree
            <ArrowRight className="size-4 sm:size-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Carousel section */}
        <div className="relative w-full max-w-5xl mx-auto mt-8">
          {/* Background blur */}
          <div className="absolute inset-x-0 -top-10 h-40 bg-primary/30 rounded-full blur-3xl"></div>

          {/* Carousel container */}
          <div
            ref={carouselRef}
            className={`relative aspect-[16/11] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-lg touch-pan-x ${
              !isLoaded
                ? "opacity-0"
                : "opacity-100 transition-opacity duration-300"
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={`absolute inset-0 flex transition-transform duration-500 ease-in-out`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselImages.map((image, index) => (
                <div key={index} className="relative w-full flex-shrink-0">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 480px) 400px, (max-width: 768px) 640px, (max-width: 1280px) 1000px, 1250px"
                    className="object-contain"
                    priority={index === 0}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent">
                    <div className="absolute inset-x-0 bottom-4 text-center">
                      <p className="text-sm sm:text-base font-medium mb-2">
                        {image.title}
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-xs sm:text-sm backdrop-blur-sm"
                      >
                        Try this design
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons - Hide on mobile */}
            <div className="hidden sm:block">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm hover:bg-background/40"
                onClick={prevSlide}
                disabled={!isLoaded}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/20 backdrop-blur-sm hover:bg-background/40"
                onClick={nextSlide}
                disabled={!isLoaded}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                    currentIndex === index ? "bg-primary" : "bg-primary/30"
                  }`}
                  onClick={() => isLoaded && setCurrentIndex(index)}
                  disabled={!isLoaded}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
