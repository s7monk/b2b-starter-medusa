import { getProductPrice } from "@/lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewAddToCart from "./preview-add-to-cart"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  if (!product) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  const inventoryQuantity = product.variants?.reduce((acc, variant) => {
    return acc + (variant?.inventory_quantity || 0)
  }, 0)

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div
        data-testid="product-wrapper"
        className="flex flex-col relative w-full h-[520px] overflow-hidden bg-white border border-gray-100 group-hover:border-[#FF000F] transition-all ease-in-out duration-300 group-hover:shadow-[0_8px_32px_rgba(255,0,15,0.1)]"
        style={{ borderRadius: '8px' }}
      >
        {/* 产品图片区域 */}
        <div className="relative w-full aspect-square bg-neutral-50 overflow-hidden flex-shrink-0">
          <div className="w-full h-full p-6">
            <Thumbnail
              thumbnail={product.thumbnail}
              images={product.images}
              size="square"
              isFeatured={isFeatured}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* 添加购物车按钮 - 悬浮显示 */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PreviewAddToCart product={product} region={region} />
          </div>
          
          {/* 库存状态指示器 */}
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <div
                className={clx("w-2 h-2 rounded-full", {
                  "bg-green-500": inventoryQuantity && inventoryQuantity > 50,
                  "bg-orange-500": inventoryQuantity && inventoryQuantity <= 50 && inventoryQuantity > 0,
                  "bg-red-500": inventoryQuantity === 0,
                })}
              />
              <Text className="text-xs font-jxd text-[#0F0F0F]">
                {inventoryQuantity} left
              </Text>
            </div>
          </div>
        </div>

        {/* 产品信息区域 */}
        <div className="flex flex-col gap-3 p-6 flex-1 justify-between">
          <div className="flex flex-col gap-3">
            {/* 品牌标签 */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-[#FF000F]"></div>
              <Text className="text-xs font-jxd text-gray-500 uppercase tracking-wider">
                BRAND
              </Text>
            </div>
            
            {/* 产品标题 */}
            <Text 
              className="text-[#0F0F0F] font-jxd-bold text-lg leading-tight group-hover:text-[#FF000F] transition-colors duration-300" 
              data-testid="product-title"
            >
              {product.title}
            </Text>
          </div>
          
          {/* 价格区域 - 固定在底部 */}
          <div className="flex flex-col gap-1">
            {cheapestPrice && (
              <div className="flex items-baseline gap-2">
                <PreviewPrice price={cheapestPrice} />
              </div>
            )}
            <Text className="text-gray-500 text-xs font-jxd">
              Excl. VAT
            </Text>
            
            {/* 底部装饰线 */}
            <div className="w-full h-px bg-gradient-to-r from-[#FF000F] via-gray-200 to-transparent mt-2"></div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
