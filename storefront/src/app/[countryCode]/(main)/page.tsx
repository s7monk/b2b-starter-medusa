import { listRegions } from "@/lib/data/regions"
import FeaturedProducts from "@/modules/home/components/featured-products"
import Hero from "@/modules/home/components/hero"
import WhoWeAre from "@/modules/home/components/who-we-are"
import HowWeHelp from "@/modules/home/components/how-we-help"
import OurBrands from "@/modules/home/components/our-brands"
import ProductCategories from "@/modules/home/components/product-categories"
import CompanyInfo from "@/modules/home/components/company-info"
import SkeletonFeaturedProducts from "@/modules/skeletons/templates/skeleton-featured-products"
import { Metadata } from "next"
import { Suspense } from "react"

export const dynamicParams = true

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then(
    (regions) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )
  return countryCodes.map((countryCode) => ({ countryCode }))
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  return (
    <div className="flex flex-col">
      <Hero />
      <WhoWeAre />
      <HowWeHelp />
      <ProductCategories />
      <OurBrands />
      <CompanyInfo />
      <div className="flex flex-col">
        <Suspense fallback={<SkeletonFeaturedProducts />}>
          <FeaturedProducts countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}
