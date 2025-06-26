import LocalizedClientLink from "@/modules/common/components/localized-client-link"

export default function SkeletonMegaMenu() {
  return (
    <LocalizedClientLink
      className="relative text-[#0f0f0f] hover:text-[#FF000F] font-semibold px-3 py-2 transition-all duration-300 border-b-2 border-transparent hover:border-[#FF000F]"
      href="/store"
    >
      Products
    </LocalizedClientLink>
  )
}
