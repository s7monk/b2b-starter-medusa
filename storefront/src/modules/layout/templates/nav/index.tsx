import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import AccountButton from "@/modules/account/components/account-button"
import CartButton from "@/modules/cart/components/cart-button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import FilePlus from "@/modules/common/icons/file-plus"
import LogoIcon from "@/modules/common/icons/logo"
import { RequestQuoteConfirmation } from "@/modules/quotes/components/request-quote-confirmation"
import { RequestQuotePrompt } from "@/modules/quotes/components/request-quote-prompt"
import SkeletonAccountButton from "@/modules/skeletons/components/skeleton-account-button"
import SkeletonCartButton from "@/modules/skeletons/components/skeleton-cart-button"
import { Suspense } from "react"

export async function NavigationHeader() {
  const customer = await retrieveCustomer().catch(() => null)
  const cart = await retrieveCart()

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <header className="content-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <LocalizedClientLink
            className="hover:opacity-80 transition-opacity"
            href="/"
          >
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <LogoIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Industrial Automation Store
                </h1>
                <p className="text-xs text-gray-500">Professional Industrial Solutions</p>
              </div>
            </div>
          </LocalizedClientLink>

          {/* Center - Search */}
          <div className="flex-1 max-w-2xl mx-8 hidden small:block">
            <div className="relative">
              <input
                disabled
                type="text"
                placeholder="Search by part number, brand, or description..."
                className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm hover:cursor-not-allowed"
                title="Advanced search functionality coming soon"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Contact Info */}
            <div className="hidden large:flex flex-col text-right text-sm">
              <span className="text-gray-600">Need Help?</span>
              <span className="text-blue-600 font-semibold">1-800-AUTOMATION</span>
            </div>

            {/* Quote Button */}
            {customer && cart?.items && cart.items.length > 0 ? (
              <RequestQuoteConfirmation>
                <button
                  className="flex gap-2 items-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                >
                  <FilePlus className="w-4 h-4" />
                  <span className="hidden small:inline-block">Get Quote</span>
                </button>
              </RequestQuoteConfirmation>
            ) : (
              <RequestQuotePrompt>
                <button className="flex gap-2 items-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
                  <FilePlus className="w-4 h-4" />
                  <span className="hidden small:inline-block">Get Quote</span>
                </button>
              </RequestQuotePrompt>
            )}

            {/* Account & Cart */}
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
  )
}
