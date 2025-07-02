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
import { ExclamationCircle, LockClosedSolidMini, ShoppingCart } from "@medusajs/icons"
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
      <Drawer
        onMouseEnter={cancelTimer}
        className="rounded-none m-0 p-0 bg-none z-[1200]"
        open={isOpen}
        onOpenChange={setIsOpen}
        {...(props as any)}
      >
        <Drawer.Trigger asChild>
          <button className="relative cursor-pointer flex items-center justify-center w-6 h-6 focus:outline-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="21" r="1" stroke="#000000" strokeWidth="1.5" fill="none"/>
              <circle cx="20" cy="21" r="1" stroke="#000000" strokeWidth="1.5" fill="none"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            {/* 购物车数量徽章 - 精确定位 */}
            {totalItems > 0 && (
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 z-[1300] min-w-[18px] h-[18px] px-1 text-white bg-[#FF000F] rounded-full flex items-center justify-center text-[10px] !font-jxd-bold leading-none" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
                <span className="whitespace-nowrap">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              </div>
            )}
          </button>
        </Drawer.Trigger>
        <Drawer.Content
          className="z-[1200] rounded-none m-0 p-0 inset-y-0 sm:right-0 w-full sm:w-[520px] shadow-xl border-l border-gray-200"
          onMouseEnter={cancelTimer}
          overlayProps={{
            className: "fixed inset-0 bg-black/40 z-[1100]",
          }}
        >
          <Drawer.Header className="relative px-6 pt-6 pb-5 bg-white">
            {/* 底部红色渐变分隔线 */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF000F]/30 to-transparent"></div>
            {/* 红色装饰线 - 精致设计 */}
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#FF000F]/80 to-[#CC0000]/80 rounded-full shadow-md mb-5"></div>
            {totalItems > 0 && (
              <Drawer.Title className="text-[#0F0F0F] !font-jxd-bold text-xl leading-tight" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
                You have {totalItems} items in your cart
              </Drawer.Title>
            )}
          </Drawer.Header>

          {/* 状态横幅区域 */}
          {cart?.approvals && cart.approvals.length > 0 && (
            <div className="p-4 bg-blue-50 border-b border-blue-100">
              <ApprovalStatusBanner cart={cart} />
            </div>
          )}
          {promotions.length > 0 && (
            <div className="p-4 bg-green-50 border-b border-green-100">
              <AppliedPromotions promotions={promotions} />
            </div>
          )}

          <div className="flex flex-col h-full justify-between overflow-hidden">
            {cart && cart.items && totalItems > 0 ? (
              <>
                {/* 商品列表区域 */}
                <div className="flex-1 overflow-auto bg-white">
                  <ItemsTemplate
                    cart={cart}
                    showBorders={false}
                    showTotal={false}
                  />
                </div>

                {/* 底部操作区域 */}
                <div className="flex flex-col gap-y-2 px-6 pt-4 pb-6 border-t border-gray-200 bg-white">
                  {/* 免费运费提示 */}
                  {cart && freeShippingPrices.length > 0 && (
                    <FreeShippingPriceNudge
                      variant="inline"
                      cart={{
                        ...cart,
                        promotions: cart.promotions || []
                      } as any}
                      freeShippingPrices={freeShippingPrices}
                    />
                  )}

                  {/* 小计 */}
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                      <Text className="!font-jxd-medium text-lg text-[#374151]" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Subtotal</Text>
                      <Text className="!font-jxd-bold text-2xl text-[#0F0F0F]" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
                        {convertToLocale({
                          amount: subtotal,
                          currency_code: cart?.currency_code,
                        })}
                      </Text>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex flex-col gap-y-3 mt-4">
                    <LocalizedClientLink href="/cart">
                      <button className="w-full h-12 border border-gray-300 text-gray-700 hover:border-[#FF000F] hover:text-[#FF000F] !font-jxd-regular text-sm rounded-full transition-all duration-300 uppercase tracking-wide bg-white hover:bg-gray-50 hover:shadow-md" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
                        View Cart Details
                      </button>
                    </LocalizedClientLink>
                    
                    <LocalizedClientLink href={checkoutPath}>
                      <button
                        className="w-full h-12 text-white !font-jxd-regular text-sm rounded-full transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        style={{ 
                          fontFamily: 'JXD-Regular, sans-serif',
                          backgroundColor: (totalItems === 0 || spendLimitExceeded) ? '#9CA3AF' : '#FF000F',
                          background: !(totalItems === 0 || spendLimitExceeded) ? 'linear-gradient(to right, #FF000F, #CC0000)' : '#9CA3AF'
                        }}
                        onMouseEnter={(e) => {
                          if (!(totalItems === 0 || spendLimitExceeded)) {
                            e.currentTarget.style.background = 'linear-gradient(to right, #CC0000, #990000)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!(totalItems === 0 || spendLimitExceeded)) {
                            e.currentTarget.style.background = 'linear-gradient(to right, #FF000F, #CC0000)'
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

                    {/* 支出限制警告 */}
                    {spendLimitExceeded && (
                      <div className="flex items-start gap-x-3 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                        <ExclamationCircle className="text-orange-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-orange-800 !font-jxd-medium text-sm mb-1" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                            Spending Limit Exceeded
                          </p>
                          <p className="text-orange-700 !font-jxd-light text-xs" style={{ fontFamily: 'JXD-Light, sans-serif' }}>
                            This order exceeds your spending limit. Please contact your manager for approval.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              /* 空购物车状态 */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="!font-jxd-bold text-xl text-[#0F0F0F] mb-3" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>Your cart is empty</h3>
                <p className="!font-jxd-light text-gray-600 mb-8 max-w-sm leading-relaxed" style={{ fontFamily: 'JXD-Light, sans-serif' }}>
                  Discover our products and start building your order
                </p>
                <LocalizedClientLink href="/store">
                  <button 
                    className="px-8 py-3 bg-[#FF000F] hover:bg-[#CC0000] text-white !font-jxd-regular text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-lg" 
                    style={{ fontFamily: 'JXD-Regular, sans-serif' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #CC0000 0%, #990000 100%)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FF000F'
                    }}
                  >
                    Continue Shopping
                  </button>
                </LocalizedClientLink>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer>
    </>
  )
}

export default CartDrawer
