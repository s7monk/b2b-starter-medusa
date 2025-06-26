import { getProductsById } from "@/lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

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
    <div className="content-container py-12 small:py-24 bg-neutral-100">
      <div className="flex justify-between mb-12">
        <Text className="text-3xl font-jxd-bold text-[#0F0F0F] relative after:content-[''] after:absolute after:-top-6 after:left-0 after:w-[48px] after:h-[6px] after:bg-[#FF000F]">{collection.title}</Text>
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
