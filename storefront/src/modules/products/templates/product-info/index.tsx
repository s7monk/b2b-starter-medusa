import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="flex flex-col gap-6">
      {/* 品牌标识 */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-1 bg-[#FF000F]"></div>
        <Text className="text-sm font-jxd text-gray-500 uppercase tracking-wider">
          BRAND
        </Text>
      </div>
      
      {/* 产品标题 */}
      <div className="flex flex-col gap-4">
        <Heading
          level="h1"
          className="text-4xl lg:text-5xl font-jxd-bold text-[#0F0F0F] leading-tight"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {product.subtitle && (
          <Text
            className="text-lg font-jxd text-gray-600 leading-relaxed"
            data-testid="product-description"
          >
            {product.subtitle}
          </Text>
        )}
      </div>
      
      {/* 装饰线 */}
      <div className="w-full h-px bg-gradient-to-r from-[#FF000F] via-gray-200 to-transparent"></div>
    </div>
  )
}

export default ProductInfo
