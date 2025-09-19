import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductCategories } from "@/components/product-categories"
import { ProductGrid } from "@/components/product-grid"
import { CampaignShowcase } from "@/components/campaign-showcase"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProductCategories />
        <ProductGrid />
        <CampaignShowcase />
      </main>
      <Footer />
    </div>
  )
}
