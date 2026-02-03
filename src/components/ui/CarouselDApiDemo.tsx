import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type CarouselProps = {
  images: string[]
}

export function CarouselDApiDemo({ images }: CarouselProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Carousel className="h-full w-full">
        {/* BAL GOMB */}
        <CarouselPrevious
          className="
            absolute left-3 top-1/2 z-10
            hidden md:flex
            -translate-y-1/2
            h-10 w-10 rounded-full
            border-0 shadow-none
            bg-[var(--bg-color-secondary)]
            text-[var(--text-color-main)]
            ring-0 focus:ring-0 focus-visible:ring-0
          "
        />

        {/* JOBB GOMB */}
        <CarouselNext
          className="
            absolute right-3 top-1/2 z-10
            hidden md:flex
            -translate-y-1/2
            h-10 w-10 rounded-full
            border-0 shadow-none
            bg-[var(--bg-color-secondary)]
            text-[var(--text-color-main)]
            ring-0 focus:ring-0 focus-visible:ring-0
          "
        />

        <CarouselContent
          className="
            h-full
            bg-transparent
            rounded-none
          "
        >
          {images.map((src, index) => (
            <CarouselItem key={index} className="h-full">
              <img
                src={src}
                alt=""
                className="
                  block
                  h-full w-full
                  object-cover
                "
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
