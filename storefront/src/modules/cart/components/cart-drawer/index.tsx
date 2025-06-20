"use client"

import { useCart } from "@/lib/context/cart-context"
import { checkSpendingLimit } from "@/lib/util/check-spending-limit"
import { getCheckoutStep } from "@/lib/util/get-checkout-step"
import { convertToLocale } from "@/lib/util/money"
import AppliedPromotions from "@/modules/cart/components/applied-promotions"
import ApprovalStatusBanner from "@/modules/cart/components/approval-status-banner"
import ItemsTemplate from "@/modules/cart/templates/items"
import Button from "@/modules/common/components/button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import ShoppingBag from "@/modules/common/icons/shopping-bag"
import FreeShippingPriceNudge from "@/modules/shipping/components/free-shipping-price-nudge"
import { B2BCustomer } from "@/types"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"
import { ExclamationCircle, LockClosedSolidMini } from "@medusajs/icons"
import { Drawer, Text } from "@medusajs/ui"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

type CartDrawerProps = {
  customer: B2BCustomer | null
  freeShippingPrices: StoreFreeShippingPrice[]
}

const CartDrawer = ({
  customer,
  freeShippingPrices,
  ...props
}: CartDrawerProps) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const { cart } = useCart()

  const items = cart?.items || []
  const promotions = cart?.promotions || []

  const totalItems =
    items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = useMemo(() => cart?.item_subtotal ?? 0, [cart])

  const spendLimitExceeded = useMemo(
    () => checkSpendingLimit(cart, customer),
    [cart, customer]
  )

  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    if (isOpen) {
      return
    }

    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  const cancelTimer = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }
  }

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (
      itemRef.current !== totalItems &&
      !pathname.includes("/cart") &&
      !pathname.includes("/account")
    ) {
      timedOpen()
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  //close cart drawer when navigating to a different page
  useEffect(() => {
    cancelTimer()
    close()
  }, [pathname])

  const checkoutStep = cart ? getCheckoutStep(cart) : undefined
  const checkoutPath = customer
    ? checkoutStep
      ? `/checkout?step=${checkoutStep}`
      : "/checkout"
    : "/account"

  return (
    <>
      {isOpen && (
        <div className="fixed inset-[-2rem] z-10 backdrop-blur-sm p-0" />
      )}
      <Drawer
        onMouseEnter={cancelTimer}
        className="rounded-none m-0 p-0 bg-none z-50"
        open={isOpen}
        onOpenChange={setIsOpen}
        {...(props as any)}
      >
        <Drawer.Trigger asChild>
          <button className="cursor-pointer px-[4px] md:overflow-hidden relative ease-out duration-300 transition-all flex items-center justify-center h-[40px] rounded-full border-[1px] w-[40px] border-gray-600 hover:border-gray-700 hover:shadow-md">
            <div className="absolute left-[13px] top-1/2 transform -translate-y-1/2">
              <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_234_1944)">
                  <path d="M10.692 14.257H1.188C0.5346 14.257 0 13.7224 0 13.069V3.56495C0 2.91155 0.5346 2.37695 1.188 2.37695H10.692C11.3454 2.37695 11.88 2.91155 11.88 3.56495V13.069C11.88 13.7224 11.3454 14.257 10.692 14.257ZM1.188 3.56495V13.069H10.692V3.56495H1.188Z" fill="#1a1c29" className="duration-300"></path>
                  <path d="M7.7205 4.752C7.3938 4.752 7.1265 4.4847 7.1265 4.158V1.782C7.1265 1.4553 6.8592 1.188 6.5325 1.188H5.3445C5.0178 1.188 4.7505 1.4553 4.7505 1.782V4.158C4.7505 4.4847 4.4832 4.752 4.1565 4.752C3.8298 4.752 3.5625 4.4847 3.5625 4.158V1.782C3.5625 0.8019 4.3644 0 5.3445 0H6.5325C7.5126 0 8.3145 0.8019 8.3145 1.782V4.158C8.3145 4.4847 8.0472 4.752 7.7205 4.752Z" fill="#1a1c29" className="duration-300"></path>
                </g>
                <defs>
                  <clipPath id="clip0_234_1944">
                    <rect width="11.88" height="14.256" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            {totalItems > 0 && (
              <div className="-top-[6px] -right-[6px] absolute w-6 h-6 text-white bg-blue-500 rounded-full flex items-center justify-center transform transition-all duration-300 ease-out scale-100 hover:scale-110">
                <span className="select-none text-[10px] font-medium">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              </div>
            )}
          </button>
        </Drawer.Trigger>
        <Drawer.Content
          className="z-50 rounded-none m-0 p-0 inset-y-0 sm:right-0"
          onMouseEnter={cancelTimer}
        >
          <Drawer.Header className="flex self-center">
            <Drawer.Title>
              {totalItems > 0
                ? `You have ${totalItems} items in your cart`
                : "Your cart is empty"}
            </Drawer.Title>
          </Drawer.Header>
          {cart?.approvals && cart.approvals.length > 0 && (
            <div className="p-4">
              <ApprovalStatusBanner cart={cart} />
            </div>
          )}
          {promotions.length > 0 && (
            <div className="p-4">
              <AppliedPromotions promotions={promotions} />
            </div>
          )}
          <div className="flex flex-col gap-y-4 h-full self-stretch justify-between overflow-auto">
            {cart && cart.items && (
              <>
                <ItemsTemplate
                  cart={cart}
                  showBorders={false}
                  showTotal={false}
                />
                <div className="flex flex-col gap-y-3 w-full p-4">
                  {cart && freeShippingPrices && (
                    <FreeShippingPriceNudge
                      variant="inline"
                      cart={cart}
                      freeShippingPrices={freeShippingPrices}
                    />
                  )}
                  <div className="flex justify-between">
                    <Text>Subtotal</Text>
                    <Text>
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cart?.currency_code,
                      })}
                    </Text>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <LocalizedClientLink href="/cart">
                      <Button
                        variant="secondary"
                        className="w-full"
                        size="large"
                      >
                        View Cart
                      </Button>
                    </LocalizedClientLink>
                    <LocalizedClientLink href={checkoutPath}>
                      <Button
                        className="w-full"
                        size="large"
                        disabled={totalItems === 0 || spendLimitExceeded}
                      >
                        <LockClosedSolidMini />
                        {customer
                          ? spendLimitExceeded
                            ? "Spending Limit Exceeded"
                            : "Secure Checkout"
                          : "Log in to checkout"}
                      </Button>
                    </LocalizedClientLink>
                    {spendLimitExceeded && (
                      <div className="flex items-center gap-x-2 bg-neutral-100 p-3 rounded-md shadow-borders-base">
                        <ExclamationCircle className="text-orange-500 w-fit overflow-visible" />
                        <p className="text-neutral-950 text-xs">
                          This order exceeds your spending limit. Please contact
                          your manager for approval.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </Drawer.Content>
      </Drawer>
    </>
  )
}

export default CartDrawer
