export function ProductCategories() {
  const categories = [
    {
      name: "Women",
      image: "/calvin-klein-women-fashion-model-in-elegant-minima.jpg",
      href: "/women",
    },
    {
      name: "Men",
      image: "/calvin-klein-men-fashion-model-in-sleek-modern-clo.jpg",
      href: "/men",
    },
    {
      name: "Jeans",
      image: "/calvin-klein-denim-jeans-product-shot-minimalist-s.jpg",
      href: "/jeans",
    },
    {
      name: "Underwear",
      image: "/calvin-klein-underwear-collection-clean-white-back.jpg",
      href: "/underwear",
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 tracking-tight">
          SHOP BY CATEGORY
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden bg-card hover:shadow-lg transition-all duration-300 rounded-lg"
            >
              <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold tracking-wide uppercase">
                  {category.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
