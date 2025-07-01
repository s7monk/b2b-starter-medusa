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
        <div className="fixed inset-[-2rem] z-[1150] backdrop-blur-sm p-0" />
      )}
      <Drawer
        onMouseEnter={cancelTimer}
        className="rounded-none m-0 p-0 bg-none z-[1200]"
        open={isOpen}
        onOpenChange={setIsOpen}
        {...(props as any)}
      >
        <Drawer.Trigger asChild>
          <button className="relative cursor-pointer flex items-center justify-center w-6 h-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="21" r="1" stroke="#000000" strokeWidth="1.5" fill="none"/>
              <circle cx="20" cy="21" r="1" stroke="#000000" strokeWidth="1.5" fill="none"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            {/* 购物车数量徽章 - 精确定位 */}
            {totalItems > 0 && (
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 z-[1300] min-w-[18px] h-[18px] px-1 text-white bg-[#FF000F] rounded-full flex items-center justify-center text-[10px] font-bold leading-none">
                <span className="whitespace-nowrap">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              </div>
            )}
          </button>
        </Drawer.Trigger>
        <Drawer.Content
          className="z-[1200] rounded-none m-0 p-0 inset-y-0 sm:right-0"
          onMouseEnter={cancelTimer}
        >
          <Drawer.Header className="flex self-center p-6 border-b border-gray-100">
            {/* 红色装饰线 - 模仿首页风格 */}
            <div className="w-full">
              <div className="w-16 h-2 mb-6" style={{ backgroundColor: '#FF000F' }}></div>
                             <Drawer.Title className="font-jxd-bold text-2xl text-gray-900 leading-tight">
                {totalItems > 0
                  ? `You have ${totalItems} items in your cart`
                  : "Your cart is empty"}
              </Drawer.Title>
            </div>
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
                <div className="flex flex-col gap-y-6 w-full p-6 border-t border-gray-100">
                  {cart && freeShippingPrices && (
                    <FreeShippingPriceNudge
                      variant="inline"
                      cart={cart}
                      freeShippingPrices={freeShippingPrices}
                    />
                  )}
                  <div className="flex justify-between items-center py-4 border-t border-gray-200">
                    <Text className="font-jxd-regular text-lg text-gray-700">Subtotal</Text>
                    <Text className="font-jxd-bold text-xl text-gray-900">
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cart?.currency_code,
                      })}
                    </Text>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <LocalizedClientLink href="/cart">
                      <button className="w-full h-12 border border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-900 font-jxd-regular text-sm rounded-full transition-all duration-300 uppercase tracking-wide">
                        View Cart Details
                      </button>
                    </LocalizedClientLink>
                    <LocalizedClientLink href={checkoutPath}>
                      <button
                        className="w-full h-12 text-white font-jxd-regular text-sm rounded-full transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ 
                          backgroundColor: (totalItems === 0 || spendLimitExceeded) ? '#9CA3AF' : '#FF000F'
                        }}
                        onMouseEnter={(e) => {
                          if (!(totalItems === 0 || spendLimitExceeded)) {
                            e.currentTarget.style.backgroundColor = '#BB2924'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!(totalItems === 0 || spendLimitExceeded)) {
                            e.currentTarget.style.backgroundColor = '#FF000F'
                          }
                        }}
                        disabled={totalItems === 0 || spendLimitExceeded}
                      >
                        <LockClosedSolidMini className="w-4 h-4" />
                        {customer
                          ? spendLimitExceeded
                            ? "Spending Limit Exceeded"
                            : "Secure Checkout"
                          : "Log in to checkout"}
                      </button>
                    </LocalizedClientLink>
                    {spendLimitExceeded && (
                      <div className="flex items-center gap-x-3 bg-orange-50 border border-orange-200 p-4 rounded-lg">
                        <ExclamationCircle className="text-orange-500 w-5 h-5 flex-shrink-0" />
                        <p className="text-orange-700 font-jxd-light text-sm">
                          This order exceeds your spending limit. Please contact your manager for approval.
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
