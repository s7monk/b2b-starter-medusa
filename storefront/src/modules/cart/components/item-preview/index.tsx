"use client"

import LineItemPrice from "@/modules/common/components/line-item-price"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Thumbnail from "@/modules/products/components/thumbnail"
import { HttpTypes } from "@medusajs/types"
import { clx, Container } from "@medusajs/ui"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  showBorders?: boolean
  currencyCode: string
}

const ItemPreview = ({ item, showBorders = true, currencyCode }: ItemProps) => {
  const { handle } = item.variant?.product ?? {}

  const maxQuantity = item.variant?.inventory_quantity ?? 100

  return (
    <Container
      className={clx(
        "flex gap-4 w-full h-full items-center justify-between p-0",
        {
          "shadow-none": !showBorders,
        }
      )}
    >
      <div className="flex gap-x-4 items-start">
        <LocalizedClientLink href={`/products/${handle}`}>
          <Thumbnail
            thumbnail={item.thumbnail}
            size="square"
            className="bg-neutral-100 rounded-lg w-10 h-10"
          />
        </LocalizedClientLink>
        <div className="flex flex-col gap-y-2 justify-between min-h-full self-stretch">
          <div className="flex flex-col">
            <span className="text-neutral-950 !font-jxd-medium text-base" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
              {item.product?.title}
            </span>
            <span className="text-[#6B7280] text-xs !font-jxd-regular" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              {item.variant?.title}
            </span>
          </div>
          <div className="flex small:flex-row flex-col gap-2">
            {(item.metadata?.note as string) && (
              <div className="flex gap-x-1">
                <span className="text-neutral-950 text-xs font-jxd-medium">Note:</span>
                <span className="text-xs text-[#6B7280] italic truncate max-w-44 pr-px font-jxd-light">
                  {item.metadata?.note as string}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse items-end justify-between">
        <LineItemPrice
          className="hidden small:flex"
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
        <span className="self-end text-xs text-[#6B7280] italic font-jxd-light">
          {item.quantity}x
        </span>
      </div>
    </Container>
  )
}

export default ItemPreview
