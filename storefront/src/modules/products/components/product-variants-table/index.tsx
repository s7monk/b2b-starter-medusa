import { addToCartEventBus } from "@/lib/data/cart-event-bus"
import { getProductPrice } from "@/lib/util/get-product-price"
import { HttpTypes, StoreProduct, StoreProductVariant } from "@medusajs/types"
import { clx, Table, Text } from "@medusajs/ui"
import Button from "@/modules/common/components/button"
import ShoppingBag from "@/modules/common/icons/shopping-bag"
import { useState } from "react"
import BulkTableQuantity from "../bulk-table-quantity"

const ProductVariantsTable = ({
  product,
  region,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [lineItemsMap, setLineItemsMap] = useState<
    Map<
      string,
      StoreProductVariant & {
        product: StoreProduct
        quantity: number
      }
    >
  >(new Map())

  const totalQuantity = Array.from(lineItemsMap.values()).reduce(
    (acc, curr) => acc + curr.quantity,
    0
  )

  const handleQuantityChange = (variantId: string, quantity: number) => {
    setLineItemsMap((prev) => {
      const newLineItems = new Map(prev)

      if (!prev.get(variantId)) {
        newLineItems.set(variantId, {
          ...product.variants?.find((v) => v.id === variantId)!,
          product,
          quantity,
        })
      } else {
        newLineItems.set(variantId, {
          ...prev.get(variantId)!,
          quantity,
        })
      }

      return newLineItems
    })
  }

  const handleAddToCart = async () => {
    setIsAdding(true)

    const lineItems = Array.from(lineItemsMap.entries()).map(
      ([variantId, { quantity, ...variant }]) => ({
        productVariant: {
          ...variant,
        },
        quantity,
      })
    )

    addToCartEventBus.emitCartAdd({
      lineItems,
      regionId: region.id,
    })

    setIsAdding(false)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* 变体选择标题 */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-0.5 bg-[#FF000F]"></div>
        <Text className="text-sm font-jxd text-gray-500 uppercase tracking-wider">
          PRODUCT VARIANTS
        </Text>
      </div>
      
      {/* 变体表格 */}
      <div className="overflow-x-auto">
        <Table className="w-full rounded-lg overflow-hidden border border-gray-200">
          <Table.Header className="border-b border-gray-200">
            <Table.Row className="bg-gray-50 hover:!bg-gray-50">
              <Table.HeaderCell className="px-6 py-4 font-jxd-bold text-[#0F0F0F] text-sm">
                SKU
              </Table.HeaderCell>
              {product.options?.map((option) => {
                if (option.title === "Default option") {
                  return null
                }
                return (
                  <Table.HeaderCell 
                    key={option.id} 
                    className="px-6 py-4 font-jxd-bold text-[#0F0F0F] text-sm border-l border-gray-200"
                  >
                    {option.title}
                  </Table.HeaderCell>
                )
              })}
              <Table.HeaderCell className="px-6 py-4 font-jxd-bold text-[#0F0F0F] text-sm border-l border-gray-200">
                Price
              </Table.HeaderCell>
              <Table.HeaderCell className="px-6 py-4 font-jxd-bold text-[#0F0F0F] text-sm border-l border-gray-200">
                Quantity
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {product.variants?.map((variant, index) => {
              const { variantPrice } = getProductPrice({
                product,
                variantId: variant.id,
              })

              return (
                <Table.Row
                  key={variant.id}
                  className={clx("border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200", {
                    "border-b-0": index === product.variants?.length! - 1,
                  })}
                >
                  <Table.Cell className="px-6 py-4 font-jxd text-[#0F0F0F]">
                    {variant.sku}
                  </Table.Cell>
                  {variant.options?.map((option, index) => {
                    if (option.value === "Default option value") {
                      return null
                    }
                    return (
                      <Table.Cell 
                        key={option.id} 
                        className="px-6 py-4 font-jxd text-gray-600 border-l border-gray-100"
                      >
                        {option.value}
                      </Table.Cell>
                    )
                  })}
                  <Table.Cell className="px-6 py-4 font-jxd-bold text-[#0F0F0F] border-l border-gray-100">
                    {variantPrice?.calculated_price}
                  </Table.Cell>
                  <Table.Cell className="px-4 py-4 border-l border-gray-100">
                    <BulkTableQuantity
                      variantId={variant.id}
                      onChange={handleQuantityChange}
                    />
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </div>
      
      {/* 添加到购物车按钮 */}
      <Button
        onClick={handleAddToCart}
        className={clx(
          "w-full h-14 rounded-lg font-jxd-bold text-white transition-all duration-300 flex items-center justify-center gap-3",
          {
            "bg-[#FF000F] hover:bg-[#BB2924] hover:shadow-lg": totalQuantity > 0,
            "bg-gray-300 cursor-not-allowed": totalQuantity === 0,
          }
        )}
        isLoading={isAdding}
        disabled={totalQuantity === 0}
        data-testid="add-product-button"
      >
        <ShoppingBag
          className="w-5 h-5"
          fill={totalQuantity === 0 ? "none" : "currentColor"}
        />
        <span>
          {totalQuantity === 0
            ? "Choose product variant(s) above"
            : `Add ${totalQuantity} item${totalQuantity > 1 ? 's' : ''} to cart`}
        </span>
      </Button>
    </div>
  )
}

export default ProductVariantsTable
