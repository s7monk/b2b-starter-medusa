import { HttpTypes } from "@medusajs/types"
import ImageGallery from "@/modules/products/components/image-gallery"
import ProductActions from "@/modules/products/components/product-actions"
import ProductTabs from "@/modules/products/components/product-tabs"
import RelatedProducts from "@/modules/products/components/related-products"
import ProductInfo from "@/modules/products/templates/product-info"
import ProductBreadcrumb from "@/modules/products/components/product-breadcrumb"
import SkeletonRelatedProducts from "@/modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import React, { Suspense } from "react"
import ProductActionsWrapper from "./product-actions-wrapper"
import ProductFacts from "../components/product-facts"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="flex flex-col">
      {/* 面包屑导航 */}
      <Suspense fallback={
        <div className="bg-white border-b border-gray-100">
          <div className="content-container py-4">
            <div className="flex items-center space-x-2 animate-pulse">
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
              <span className="text-gray-400 mx-3 font-jxd text-sm">&gt;</span>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <span className="text-gray-400 mx-3 font-jxd text-sm">&gt;</span>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      }>
        <ProductBreadcrumb product={product} />
      </Suspense>
      
      {/* 主要产品信息区域 */}
      <div className="bg-white">
        <div className="content-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 py-8 lg:py-16">
          {/* 左侧图片区域 */}
          <div className="order-2 lg:order-1">
            <ImageGallery product={product} />
          </div>
          
          {/* 右侧产品信息区域 */}
          <div className="order-1 lg:order-2 flex flex-col gap-8 lg:py-8">
            <ProductInfo product={product} />
            <Suspense
              fallback={<ProductActions product={product} region={region} />}
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
            <ProductFacts product={product} />
          </div>
        </div>
      </div>
      
      {/* 产品详情标签页 */}
      <div className="bg-neutral-50">
        <div className="content-container py-12 lg:py-16">
          <ProductTabs product={product} />
        </div>
      </div>
      
      {/* 相关产品 */}
      <div className="bg-white">
        <div className="content-container py-12 lg:py-16">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
