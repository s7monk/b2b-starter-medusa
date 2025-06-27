import { getProductsById } from "@/lib/data/products"
import { HttpTypes } from "@medusajs/types"

import InteractiveLink from "@/modules/common/components/interactive-link"
import ProductPreview from "@/modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  const productsWithPrices = await getProductsById({
    ids: products.map((p) => p.id!),
    regionId: region.id,
  })

  return (
    <div className="content-container py-20 small:py-24 bg-neutral-100">
      <div className="flex justify-between items-start mb-16">
        <div>
          <div className="w-12 h-1 bg-[#FF000F] mb-4"></div>
          <h2 className="font-jxd-bold text-[#0F0F0F] text-4xl">
            {collection.title}
          </h2>
        </div>
        <InteractiveLink 
          href={`/collections/${collection.handle}`}
          textClassName="text-[#0F0F0F] font-jxd-bold"
          iconColor="#0F0F0F"
        >
          View all
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 large:grid-cols-4 gap-6 small:gap-8">
        {productsWithPrices &&
          productsWithPrices.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
