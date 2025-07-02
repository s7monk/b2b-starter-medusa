"use client"

import { useCart } from "@/lib/context/cart-context"
import { checkSpendingLimit } from "@/lib/util/check-spending-limit"
import ApprovalStatusBanner from "@/modules/cart/components/approval-status-banner"
import EmptyCartMessage from "@/modules/cart/components/empty-cart-message"
import SignInPrompt from "@/modules/cart/components/sign-in-prompt"
import ItemsTemplate from "@/modules/cart/templates/items"
import Summary from "@/modules/cart/templates/summary"
import { B2BCustomer } from "@/types/global"
import { Heading } from "@medusajs/ui"
import { useMemo } from "react"

const CartTemplate = ({ customer }: { customer: B2BCustomer | null }) => {
  const { cart } = useCart()

  const spendLimitExceeded = useMemo(
    () => checkSpendingLimit(cart, customer),
    [cart, customer]
  )

  const totalItems = useMemo(
    () => cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0,
    [cart?.items]
  )

  return (
    <div className="small:py-12 py-6 bg-gray-50">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div>
            <div className="flex flex-col py-6 gap-y-6">
              <div className="mb-2">
                <div className="w-16 h-1.5 bg-gradient-to-r from-[#FF000F] to-[#CC0000] rounded-full mb-3"></div>
                <h1 className="text-[#0F0F0F] !font-jxd-bold text-2xl small:text-3xl" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
                  Shopping Cart
                </h1>
              </div>
              <div className="pb-3 flex items-center">
                <p className="text-[#0F0F0F] !font-jxd-medium text-lg" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                  You have {totalItems} items in your cart
                </p>
              </div>
              <div className="grid grid-cols-1 small:grid-cols-[1fr_380px] gap-6">
                <div className="flex flex-col gap-y-4">
                  {!customer && <SignInPrompt />}
                  {cart?.approvals && cart.approvals.length > 0 && (
                    <ApprovalStatusBanner cart={cart} />
                  )}
                  <ItemsTemplate cart={cart} />
                </div>
                <div className="relative">
                  <div className="flex flex-col gap-y-8 sticky top-20">
                    {cart && cart.region && (
                      <Summary
                        customer={customer}
                        spendLimitExceeded={spendLimitExceeded}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
