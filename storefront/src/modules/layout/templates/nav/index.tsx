import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import AccountButton from "@/modules/account/components/account-button"
import CartButton from "@/modules/cart/components/cart-button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import LogoIcon from "@/modules/common/icons/logo"
import { MegaMenuWrapper } from "@/modules/layout/components/mega-menu"
import LanguageSelect from "@/modules/layout/components/language-select"
import SkeletonAccountButton from "@/modules/skeletons/components/skeleton-account-button"
import SkeletonCartButton from "@/modules/skeletons/components/skeleton-cart-button"
import SkeletonMegaMenu from "@/modules/skeletons/components/skeleton-mega-menu"
import { CartProvider } from "@/lib/context/cart-context"
import { Suspense } from "react"

export async function NavigationHeader() {
  const customer = await retrieveCustomer().catch(() => null)
  const cart = await retrieveCart()

  return (
    <>
      {/* 顶部灰色长条 - 像ABB网站那样 */}
      <div className="w-full h-[40px] bg-[#F5F5F5] flex items-center px-4 small:px-8 relative">

        {/* 右侧联系信息 */}
        <div className="flex items-center space-x-6 font-jxd-regular text-gray-600 ml-auto" style={{ fontSize: '13px' }}>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.23 15.26L16.69 14.97C16.08 14.9 15.48 15.11 15.05 15.54L13.21 17.38C10.38 15.93 8.06 13.62 6.62 10.79L8.46 8.94C8.89 8.51 9.1 7.91 9.03 7.3L8.74 4.78C8.63 3.77 7.78 3.01 6.76 3.01H5.03C3.9 3.01 2.96 3.95 3.03 5.08C3.56 13.62 10.39 20.44 18.92 20.97C20.05 21.04 20.99 20.1 20.99 18.97V17.24C21 16.22 20.24 15.37 19.23 15.26Z" fill="#E1294D" stroke="#E1294D" strokeWidth="0.5"/>
            </svg>
            +86 010-8888-9999
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" fill="#E1294D"/>
              <path d="M22 6L12 13L2 6" stroke="#ffffff" strokeWidth="1.5"/>
            </svg>
            info@jxdtech.com
          </span>
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
            <ul className="space-x-[26px] hidden small:flex items-center">
              <li>
                <LocalizedClientLink
                  className="relative text-[#0f0f0f] text-base font-medium font-jxd px-2 py-2 pb-3 transition-all duration-300 after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-0.5 after:bg-[#FF000F] after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
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
                  className="relative text-[#0f0f0f] text-base font-medium font-jxd px-2 py-2 pb-3 transition-all duration-300 after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-0.5 after:bg-[#FF000F] after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  href="/about"
                >
                  About
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="relative text-[#0f0f0f] text-base font-medium font-jxd px-2 py-2 pb-3 transition-all duration-300 after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-0.5 after:bg-[#FF000F] after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  href="/faq"
                >
                  FAQ
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  className="relative text-[#0f0f0f] text-base font-medium font-jxd px-2 py-2 pb-3 transition-all duration-300 after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-0.5 after:bg-[#FF000F] after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  href="/contact"
                >
                  Contact
                </LocalizedClientLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* 右侧 - 功能按钮 紧贴最右边 */}
        <div className="flex-shrink-0 flex items-center gap-4 ml-auto">
          <LanguageSelect />

          <Suspense fallback={<SkeletonAccountButton />}>
            <AccountButton customer={customer} />
          </Suspense>

          <Suspense fallback={<SkeletonCartButton />}>
            <CartProvider cart={cart}>
              <CartButton />
            </CartProvider>
          </Suspense>
        </div>
      </div>
    </>
  )
}
