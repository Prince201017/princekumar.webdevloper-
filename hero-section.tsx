import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/eloura-fashion-model-in-minimalist-black-and.jpg"
          alt="Eloura Campaign"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 className="hero-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl mb-4 sm:mb-6 lg:mb-8 text-balance">
          MODERN
          <br />
          LUXURY
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 lg:mb-10 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto text-pretty leading-relaxed">
          Discover the latest collection where minimalist design meets contemporary style
        </p>
        <Button className="eloura-button px-6 py-2.5 sm:px-8 sm:py-3 lg:px-10 lg:py-4 text-sm sm:text-base lg:text-lg">
          Shop Collection
        </Button>
      </div>
    </section>
  )
}
