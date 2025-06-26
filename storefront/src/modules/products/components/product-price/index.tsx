import { clx, Text } from "@medusajs/ui"
import { getProductPrice } from "@/lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
}: {
  product: HttpTypes.StoreProduct
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  if (!cheapestPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse rounded" />
  }

  return (
    <div className="flex flex-col gap-2">
      {/* 价格标签 */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-0.5 bg-[#FF000F]"></div>
        <Text className="text-sm font-jxd text-gray-500 uppercase tracking-wider">
          PRICE
        </Text>
      </div>
      
      {/* 价格信息 */}
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-3">
          <Text
            className={clx("font-jxd-bold text-3xl", {
              "text-[#FF000F]": cheapestPrice.price_type === "sale",
              "text-[#0F0F0F]": cheapestPrice.price_type !== "sale",
            })}
            data-testid="product-price"
            data-value={cheapestPrice.calculated_price_number}
          >
            From {cheapestPrice.calculated_price}
          </Text>
          
          {cheapestPrice.price_type === "sale" && (
            <Text
              className="line-through text-gray-400 font-jxd-regular text-xl"
              data-testid="original-product-price"
              data-value={cheapestPrice.original_price_number}
            >
              {cheapestPrice.original_price}
            </Text>
          )}
        </div>
        
        <Text className="text-gray-500 text-sm font-jxd">
          Excl. VAT
        </Text>
      </div>
    </div>
  )
}
