import Button from "@/modules/common/components/button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Thumbnail from "@/modules/products/components/thumbnail"
import { ArrowUturnLeft } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Container, Text } from "@medusajs/ui"

const PreviouslyPurchasedProduct = ({
  variant,
}: {
  variant: HttpTypes.StoreOrderLineItem
}) => {
  const { thumbnail, product_title, product_handle, title } = variant

  return (
    <Container className="flex justify-between items-center p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow duration-200 bg-white">
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shadow-sm flex-shrink-0">
          <Thumbnail thumbnail={thumbnail} size="square" />
        </div>
        <div className="flex flex-col justify-center gap-y-1">
          <h3 className="!font-jxd-medium text-slate-900 text-base leading-tight" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
            {product_title}
          </h3>
          <p className="!font-jxd-regular text-slate-500 text-sm" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
            {title}
          </p>
        </div>
      </div>
      <LocalizedClientLink href={`/products/${product_handle}`}>
        <Button 
          variant="secondary" 
          className="h-9 px-4 !font-jxd-medium border-slate-300 text-slate-600 hover:border-[#FF000F] hover:text-[#FF000F] transition-colors duration-200 !rounded-full flex items-center gap-x-2"
          style={{ fontFamily: 'JXD-Medium, sans-serif' }}
        >
          <span>Buy again</span>
          <ArrowUturnLeft className="w-4 h-4" />
        </Button>
      </LocalizedClientLink>
    </Container>
  )
}

export default PreviouslyPurchasedProduct
