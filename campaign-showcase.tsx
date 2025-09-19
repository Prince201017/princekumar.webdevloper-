import { Button } from "@/components/ui/button"

export function CampaignShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/eloura-campaign-model-in-black-and-white-art.jpg"
                alt="Eloura Campaign"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <h2 className="hero-text text-4xl lg:text-6xl mb-4 text-balance">
                SPRING
                <br />
                CAMPAIGN
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Explore our latest campaign featuring bold silhouettes and timeless elegance. Where modern minimalism
                meets classic American style.
              </p>
            </div>

            <div className="space-y-4">
              <Button className="eloura-button w-full sm:w-auto px-8 py-3">View Campaign</Button>
              <Button variant="outline" className="w-full sm:w-auto px-8 py-3 ml-0 sm:ml-4 bg-transparent">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
