import LocalizedClientLink from "@/modules/common/components/localized-client-link"

export default function SkeletonMegaMenu() {
  return (
    <LocalizedClientLink
      className="relative text-zinc-900 hover:text-red-600 font-medium px-3 py-2 transition-all duration-300 border-b-2 border-transparent hover:border-red-600"
      href="/store"
    >
      Products
    </LocalizedClientLink>
  )
}
