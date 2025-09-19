"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CampaignPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const campaigns = [
    {
      id: 1,
      title: "AUTUMN ELEGANCE",
      subtitle: "Sophisticated Minimalism",
      description: "Discover our latest autumn collection where timeless elegance meets contemporary design.",
      image: "/eloura-fashion-model-in-minimalist-black-and.jpg",
      cta: "Explore Collection",
      products: [
        {
          id: "women-1",
          image: "/eloura-women-fashion-model-in-elegant-minima.jpg",
          href: "/products/women/elegant-blazer",
        },
        {
          id: "women-2",
          image: "/eloura-fashion-model-in-minimalist-black-and.jpg",
          href: "/products/women/minimalist-dress",
        },
        {
          id: "women-3",
          image: "/eloura-denim-jeans-product-shot-minimalist-s.jpg",
          href: "/products/women/premium-jeans",
        },
        {
          id: "women-4",
          image: "/eloura-underwear-collection-clean-white-back.jpg",
          href: "/products/women/luxury-basics",
        },
      ],
    },
    {
      id: 2,
      title: "URBAN LUXE",
      subtitle: "City-Inspired Fashion",
      description:
        "Modern luxury for the urban lifestyle. Clean lines, premium materials, and effortless sophistication.",
      image: "/eloura-women-fashion-model-in-elegant-minima.jpg",
      cta: "Shop Now",
      products: [
        { id: "men-1", image: "/eloura-men-fashion-model-in-sleek-modern-clo.jpg", href: "/products/men/urban-jacket" },
        { id: "men-2", image: "/eloura-fashion-model-in-minimalist-black-and.jpg", href: "/products/men/city-shirt" },
        {
          id: "men-3",
          image: "/eloura-denim-jeans-product-shot-minimalist-s.jpg",
          href: "/products/men/designer-jeans",
        },
        {
          id: "men-4",
          image: "/eloura-underwear-collection-clean-white-back.jpg",
          href: "/products/men/premium-underwear",
        },
      ],
    },
    {
      id: 3,
      title: "ESSENTIAL COMFORT",
      subtitle: "Everyday Luxury",
      description: "Experience the perfect blend of comfort and style with our essential pieces.",
      image: "/eloura-men-fashion-model-in-sleek-modern-clo.jpg",
      cta: "View Essentials",
      products: [
        {
          id: "under-1",
          image: "/eloura-underwear-collection-clean-white-back.jpg",
          href: "/products/underwear/comfort-briefs",
        },
        {
          id: "under-2",
          image: "/eloura-fashion-model-in-minimalist-black-and.jpg",
          href: "/products/underwear/luxury-boxers",
        },
        {
          id: "under-3",
          image: "/eloura-women-fashion-model-in-elegant-minima.jpg",
          href: "/products/underwear/essential-bras",
        },
        {
          id: "under-4",
          image: "/eloura-denim-jeans-product-shot-minimalist-s.jpg",
          href: "/products/underwear/lounge-wear",
        },
      ],
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campaigns.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [campaigns.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % campaigns.length)
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + campaigns.length) % campaigns.length)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % campaigns.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + campaigns.length) % campaigns.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16 sm:pt-18 lg:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav />

          {/* Hero Section */}
          <section className="py-12 sm:py-16 lg:py-20 xl:py-24">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h1 className="hero-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 sm:mb-6 text-primary">
                CAMPAIGNS
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto text-pretty px-4">
                Explore our latest fashion campaigns showcasing the essence of modern luxury and timeless elegance
              </p>
            </div>
          </section>

          <section className="pb-12 sm:pb-16 lg:pb-20 xl:pb-24">
            <div className="relative">
              <div
                className="overflow-hidden rounded-xl"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {campaigns.map((campaign, index) => (
                    <div key={campaign.id} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
                        {/* Image */}
                        <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                          <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-lg bg-card">
                            <img
                              src={
                                campaign.image ||
                                "/placeholder.svg?height=600&width=480&query=fashion model elegant pose"
                              }
                              alt={campaign.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className={`space-y-6 sm:space-y-8 px-2 sm:px-0 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                          <div>
                            <h2 className="hero-text text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-4 text-foreground">
                              {campaign.title}
                            </h2>
                            <h3 className="text-lg sm:text-xl lg:text-2xl text-primary font-medium mb-4 sm:mb-6 tracking-wide">
                              {campaign.subtitle}
                            </h3>
                            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
                              {campaign.description}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Button className="eloura-button px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base">
                              {campaign.cta}
                            </Button>
                            <Button
                              variant="outline"
                              className="px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                            >
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 sm:mt-16 lg:mt-20">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12">
                          Featured Products
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                          {campaign.products.map((product) => (
                            <a
                              key={product.id}
                              href={product.href}
                              className="group block overflow-hidden rounded-lg bg-card hover:shadow-lg transition-all duration-300"
                            >
                              <div className="aspect-square overflow-hidden">
                                <img
                                  src={product.image || "/placeholder.svg?height=300&width=300&query=fashion product"}
                                  alt="Campaign Product"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="flex justify-center mt-6 space-x-2">
                {campaigns.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentSlide ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-accent rounded-xl sm:rounded-2xl text-center">
            <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-6 sm:px-8">
              <h2 className="hero-text text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 text-accent-foreground">
                JOIN THE ELOURA EXPERIENCE
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-accent-foreground/90 mb-6 sm:mb-8 text-pretty leading-relaxed">
                Be part of our exclusive community and get early access to new campaigns, collections, and special
                events
              </p>
              <Button className="bg-background text-foreground hover:bg-background/90 px-6 py-2.5 sm:px-8 sm:py-3 lg:px-10 lg:py-4 text-base sm:text-lg font-medium">
                Subscribe Now
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
