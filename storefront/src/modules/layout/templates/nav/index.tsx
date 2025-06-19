import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import AccountButton from "@/modules/account/components/account-button"
import CartButton from "@/modules/cart/components/cart-button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import FilePlus from "@/modules/common/icons/file-plus"
import LogoIcon from "@/modules/common/icons/logo"
import { MegaMenuWrapper } from "@/modules/layout/components/mega-menu"
import LanguageSelect from "@/modules/layout/components/language-select"
import { RequestQuoteConfirmation } from "@/modules/quotes/components/request-quote-confirmation"
import { RequestQuotePrompt } from "@/modules/quotes/components/request-quote-prompt"
import SkeletonAccountButton from "@/modules/skeletons/components/skeleton-account-button"
import SkeletonCartButton from "@/modules/skeletons/components/skeleton-cart-button"
import SkeletonMegaMenu from "@/modules/skeletons/components/skeleton-mega-menu"
import { Suspense } from "react"

export async function NavigationHeader() {
  const customer = await retrieveCustomer().catch(() => null)
  const cart = await retrieveCart()

  return (
    <>
      {/* 顶部灰色长条 - 像ABB网站那样 */}
      <div className="w-full h-[40px] bg-[#F5F5F5] flex items-center justify-end px-4">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>News & Media</span>
          <span>Careers</span>
          <span>Investors</span>
          <span>Contact Us</span>
        </div>
      </div>
      
      <div className="sticky top-0 inset-x-0 group bg-white text-zinc-900 h-[75px] small:px-4 px-2 text-sm duration-200 z-50 flex items-center">
        <header className="flex w-full content-container relative small:mx-auto justify-between">
          <div className="small:mx-auto flex justify-between items-center min-w-full">
            <div className="flex items-center small:space-x-4">
              <LocalizedClientLink
                className="hover:text-ui-fg-base flex items-center w-fit"
                href="/"
              >
                <h1 className="small:text-base text-sm font-medium flex items-center">
                  <LogoIcon className="inline" />
                </h1>
              </LocalizedClientLink>
              <div style={{ width: '120px' }}></div>

              <nav>
                <ul className="space-x-6 hidden small:flex items-center">
                  <li>
                    <Suspense fallback={<SkeletonMegaMenu />}>
                      <MegaMenuWrapper />
                    </Suspense>
                  </li>
                  <li>
                    <LocalizedClientLink
                      className="relative text-[#0f0f0f] text-base font-medium font-jxd px-3 py-2 pb-3 transition-all duration-300 after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                      href="/about"
                    >
                      About Us
                    </LocalizedClientLink>
                  </li>
                  <li>
                    <LocalizedClientLink
                      className="relative text-[#0f0f0f] text-base font-medium font-jxd px-3 py-2 pb-3 transition-all duration-300 after:content-[''] after:absolute after:-bottom-4 after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                      href="/contact"
                    >
                      Contact Us
                    </LocalizedClientLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex justify-end items-center gap-2">
              <LanguageSelect />

              <div className="h-4 w-px bg-neutral-300" />

              {customer && cart?.items && cart.items.length > 0 ? (
                <RequestQuoteConfirmation>
                  <button
                    className="flex gap-1.5 items-center rounded-2xl bg-none shadow-none border-none hover:bg-neutral-100 px-2 py-1 text-[#0f0f0f]"
                    // disabled={isPendingApproval}
                  >
                    <FilePlus />
                    <span className="hidden small:inline-block text-base font-medium font-jxd">Quote</span>
                  </button>
                </RequestQuoteConfirmation>
              ) : (
                <RequestQuotePrompt>
                  <button className="flex gap-1.5 items-center rounded-2xl bg-none shadow-none border-none hover:bg-neutral-100 px-2 py-1 text-[#0f0f0f]">
                    <FilePlus />
                    <span className="hidden small:inline-block text-base font-medium font-jxd">Quote</span>
                  </button>
                </RequestQuotePrompt>
              )}

              <Suspense fallback={<SkeletonAccountButton />}>
                <AccountButton customer={customer} />
              </Suspense>

              <Suspense fallback={<SkeletonCartButton />}>
                <CartButton />
              </Suspense>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}
