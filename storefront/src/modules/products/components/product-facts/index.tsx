import {
  CheckCircleSolid,
  ExclamationCircleSolid,
  InformationCircleSolid,
} from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

const ProductFacts = ({ product }: { product: HttpTypes.StoreProduct }) => {
  const inventoryQuantity =
    product.variants?.reduce(
      (acc, variant) => acc + (variant.inventory_quantity ?? 0),
      0
    ) || 0

  return (
    <div className="flex flex-col gap-6">
      {/* 库存状态标题 */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-0.5 bg-[#FF000F]"></div>
        <Text className="text-sm font-jxd text-gray-500 uppercase tracking-wider">
          AVAILABILITY
        </Text>
      </div>
      
      {/* 库存信息 */}
      <div className="flex flex-col gap-4 bg-gray-50 p-6 rounded-lg">
        {inventoryQuantity > 10 ? (
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>
            <Text className="font-jxd text-[#0F0F0F]">
              <span className="font-jxd-bold">Can be shipped immediately</span>
              <span className="text-gray-600 ml-2">({inventoryQuantity} in stock)</span>
            </Text>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-orange-500 flex-shrink-0"></div>
            <Text className="font-jxd text-[#0F0F0F]">
              <span className="font-jxd-bold">Limited quantity available</span>
              <span className="text-gray-600 ml-2">({inventoryQuantity} in stock)</span>
            </Text>
          </div>
        )}
        
        {product.mid_code && (
          <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
            <InformationCircleSolid className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <Text className="font-jxd text-gray-600">
              <span className="font-jxd-bold">MID:</span> {product.mid_code}
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductFacts
