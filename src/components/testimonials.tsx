"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import Autoplay from "embla-carousel-autoplay"
import { publicUrl } from "@/lib/strapi"
import { Testimonial } from "@/actions/testimonial"

interface TestimonialsProps {
  testimonials: Testimonial[];
}
export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", onSelect)

    // Get initial position
    setCurrent(api.selectedScrollSnap())

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <div className="w-full max-w-6xl mx-auto">

      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="w-full">
                <div className="bg-white rounded-2xl shadow-sm border border-[#f5f5f5] overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="w-full md:w-1/5 bg-brand-white h-64 md:h-auto relative">
                      <Image
                        src={publicUrl(testimonial.photo?.formats?.small?.url)}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-4/5 p-6 md:p-10 flex flex-col justify-center">
                      <h2 className="text-2xl font-semibold mb-4">{testimonial.name}</h2>
                      <p className="text-lg md:text-xl">{testimonial.testimonial}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-0 -translate-x-12 md:-translate-x-16 h-10 w-10 rounded-full border-none shadow-none bg-transparent hover:bg-transparent text-brand-slate cursor-pointer max-md:hidden">
            <ArrowLeftCircle size={36} className="text-brand-slate opacity-70 hover:opacity-100 transition-opacity" />
          </CarouselPrevious>

          <CarouselNext className="absolute right-0 translate-x-12 md:translate-x-16 h-10 w-10 rounded-full border-none shadow-none bg-transparent hover:bg-transparent text-brand-slate cursor-pointer max-md:hidden">
            <ArrowRightCircle size={36} className="text-brand-slate opacity-70 hover:opacity-100 transition-opacity" />
          </CarouselNext>
        </Carousel>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              current === index ? "bg-brand-slate scale-100" : "bg-brand-silver scale-75 opacity-60",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
