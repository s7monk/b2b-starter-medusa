import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import { listCartFreeShippingPrices } from "@/lib/data/fulfillment"
import { getBaseURL } from "@/lib/util/env"
import CartMismatchBanner from "@/modules/layout/components/cart-mismatch-banner"
import Footer from "@/modules/layout/templates/footer"
import { NavigationHeader } from "@/modules/layout/templates/nav"
import FreeShippingPriceNudge from "@/modules/shipping/components/free-shipping-price-nudge"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"

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
      <nav className="bg-[#F4F5F7]" style={{height: '56px'}}>
        <div className="w-full content-container relative small:mx-auto small:p-4 p-2 h-full">
          <div className="flex justify-start items-center space-x-8 h-full">
            <a
              href="/"
              className="text-[#0c4f93] hover:text-[#0a3d7a] hover:border-b-2 hover:border-[#0a3d7a] px-3 py-3 text-sm font-medium border-b-2 border-transparent"
              style={{
                transition: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Home
            </a>
            <a
              href="/products"
              className="text-[#0c4f93] hover:text-[#0a3d7a] hover:border-b-2 hover:border-[#0a3d7a] px-3 py-3 text-sm font-medium border-b-2 border-transparent"
              style={{
                transition: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Products
            </a>
            <a
              href="/categories"
              className="text-[#0c4f93] hover:text-[#0a3d7a] hover:border-b-2 hover:border-[#0a3d7a] px-3 py-3 text-sm font-medium border-b-2 border-transparent"
              style={{
                transition: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Categories
            </a>
            <a
              href="/store"
              className="text-[#0c4f93] hover:text-[#0a3d7a] hover:border-b-2 hover:border-[#0a3d7a] px-3 py-3 text-sm font-medium border-b-2 border-transparent"
              style={{
                transition: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Store
            </a>
            <a
              href="/collections"
              className="text-[#0c4f93] hover:text-[#0a3d7a] hover:border-b-2 hover:border-[#0a3d7a] px-3 py-3 text-sm font-medium border-b-2 border-transparent"
              style={{
                transition: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Collections
            </a>
          </div>
        </div>
      </nav>

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
