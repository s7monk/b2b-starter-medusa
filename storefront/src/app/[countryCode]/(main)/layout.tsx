import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import { listCartFreeShippingPrices } from "@/lib/data/fulfillment"
import { getBaseURL } from "@/lib/util/env"
import CartMismatchBanner from "@/modules/layout/components/cart-mismatch-banner"
import Footer from "@/modules/layout/templates/footer"
import { NavigationHeader } from "@/modules/layout/templates/nav"
import FreeShippingPriceNudge from "@/modules/shipping/components/free-shipping-price-nudge"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer().catch(() => null)
  const cart = await retrieveCart()
  let freeShippingPrices: StoreFreeShippingPrice[] = []

  if (cart) {
    freeShippingPrices = await listCartFreeShippingPrices(cart.id)
  }

  return (
    <>
      <NavigationHeader />
      
      {/* Main Navigation Menu Bar - Industrial Professional Style */}
      <div className="bg-gray-600 text-white shadow-lg">
        <div className="content-container">
          <nav className="flex items-center justify-between py-3">
            {/* Left side navigation */}
            <div className="flex items-center space-x-6">
              <LocalizedClientLink 
                href="/" 
                className="text-white hover:text-orange-300 font-medium transition-colors py-2 px-3 rounded hover:bg-gray-500"
              >
                Home
              </LocalizedClientLink>
              
              <div className="relative group">
                                  <LocalizedClientLink 
                    href="/store" 
                    className="text-white hover:text-orange-300 font-medium transition-colors py-2 px-3 rounded hover:bg-gray-500 flex items-center"
                  >
                    Products
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </LocalizedClientLink>
              </div>

              <LocalizedClientLink 
                href="/brands" 
                className="text-white hover:text-orange-300 font-medium transition-colors py-2 px-3 rounded hover:bg-gray-500"
              >
                Brands
              </LocalizedClientLink>

              <LocalizedClientLink 
                href="/solutions" 
                className="text-white hover:text-orange-300 font-medium transition-colors py-2 px-3 rounded hover:bg-gray-500"
              >
                Solutions
              </LocalizedClientLink>

              <LocalizedClientLink 
                href="/support" 
                className="text-white hover:text-orange-300 font-medium transition-colors py-2 px-3 rounded hover:bg-gray-500"
              >
                Support
              </LocalizedClientLink>

              <LocalizedClientLink 
                href="/about" 
                className="text-white hover:text-orange-300 font-medium transition-colors py-2 px-3 rounded hover:bg-gray-500"
              >
                About
              </LocalizedClientLink>
            </div>

            {/* Right side info */}
            <div className="hidden small:flex items-center text-sm text-gray-300 space-x-6">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-white font-medium">1-800-AUTOMATION</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>sales@industrial-automation.com</span>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {props.children}

      <Footer />

      {cart && freeShippingPrices && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          freeShippingPrices={freeShippingPrices}
        />
      )}
    </>
  )
}
