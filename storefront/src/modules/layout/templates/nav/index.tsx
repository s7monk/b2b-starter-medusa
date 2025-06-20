import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import AccountButton from "@/modules/account/components/account-button"
import CartButton from "@/modules/cart/components/cart-button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import LogoIcon from "@/modules/common/icons/logo"
import { MegaMenuWrapper } from "@/modules/layout/components/mega-menu"
import LanguageSelect from "@/modules/layout/components/language-select"
import QuoteButton from "@/modules/quotes/components/quote-button"
import SkeletonAccountButton from "@/modules/skeletons/components/skeleton-account-button"
import SkeletonCartButton from "@/modules/skeletons/components/skeleton-cart-button"
import SkeletonQuoteButton from "@/modules/skeletons/components/skeleton-quote-button"
import SkeletonMegaMenu from "@/modules/skeletons/components/skeleton-mega-menu"
import { CartProvider } from "@/lib/context/cart-context"
import { Suspense } from "react"

export async function NavigationHeader() {
  const customer = await retrieveCustomer().catch(() => null)
  const cart = await retrieveCart()

  return (
    <>
      {/* 顶部灰色长条 - 像ABB网站那样 */}
      <div className="w-full h-[40px] bg-[#F5F5F5] flex items-center justify-end px-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600 mr-4">
          <span>News & Media</span>
          <span>Careers</span>
          <span>Investors</span>
          <span>Contact Us</span>
        </div>
      </div>
      
      {/* 主导航栏 - ABB风格：logo最左，菜单中间，按钮最右 */}
      <div className="sticky top-0 inset-x-0 group bg-white text-zinc-900 h-[75px] text-sm duration-200 z-50 flex items-center w-full px-4 small:px-8 relative">
        {/* 左侧 - Logo 紧贴最左边 */}
        <div className="flex-shrink-0">
          <LocalizedClientLink
            className="hover:text-ui-fg-base flex items-center w-fit"
            href="/"
          >
            <h1 className="small:text-base text-sm font-medium flex items-center">
              <LogoIcon className="inline" />
            </h1>
          </LocalizedClientLink>
        </div>

        {/* 中间 - 菜单导航 绝对居中 */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <nav>
            <ul className="space-x-8 hidden small:flex items-center">
              <li>
                <LocalizedClientLink
                  className="relative text-[#0f0f0f] text-base font-medium font-jxd px-3 py-2 pb-3 transition-all duration-300 after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  href="/"
                >
                  Home
                </LocalizedClientLink>
              </li>
              <li>
                <Suspense fallback={<SkeletonMegaMenu />}>
                  <MegaMenuWrapper />
                </Suspense>
              </li>
              <li>
                <LocalizedClientLink
                  className="relative text-[#0f0f0f] text-base font-medium font-jxd px-3 py-2 pb-3 transition-all duration-300 after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  href="/faq"
                >
                  FAQ
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="relative text-[#0f0f0f] text-base font-medium font-jxd px-3 py-2 pb-3 transition-all duration-300 after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  href="/about"
                >
                  About Us
                </LocalizedClientLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* 右侧 - 功能按钮 紧贴最右边 */}
        <div className="flex-shrink-0 flex items-center gap-2 ml-auto">
          <LanguageSelect />

          <div className="h-4 w-px bg-neutral-300" />

          <Suspense fallback={<SkeletonQuoteButton />}>
            <CartProvider cart={cart}>
              <QuoteButton customer={customer} />
            </CartProvider>
          </Suspense>

          <Suspense fallback={<SkeletonAccountButton />}>
            <AccountButton customer={customer} />
          </Suspense>

          <Suspense fallback={<SkeletonCartButton />}>
            <CartButton />
          </Suspense>
        </div>
      </div>
    </>
  )
}
