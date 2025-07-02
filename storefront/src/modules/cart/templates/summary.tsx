"use client"

import { useCart } from "@/lib/context/cart-context"
import { getCheckoutStep } from "@/lib/util/get-checkout-step"

import CartTotals from "@/modules/cart/components/cart-totals"
import PromotionCode from "@/modules/checkout/components/promotion-code"
import Button from "@/modules/common/components/button"
import Divider from "@/modules/common/components/divider"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { RequestQuoteConfirmation } from "@/modules/quotes/components/request-quote-confirmation"
import { RequestQuotePrompt } from "@/modules/quotes/components/request-quote-prompt"
import { B2BCustomer } from "@/types"
import { ApprovalStatusType } from "@/types/approval"
import { ExclamationCircle } from "@medusajs/icons"
import { Container } from "@medusajs/ui"

type SummaryProps = {
  customer: B2BCustomer | null
  spendLimitExceeded: boolean
}

const Summary = ({ customer, spendLimitExceeded }: SummaryProps) => {
  const { handleEmptyCart, cart } = useCart()

  if (!cart) return null

  const checkoutStep = getCheckoutStep(cart)
  const checkoutPath = checkoutStep
    ? `/checkout?step=${checkoutStep}`
    : "/checkout"

  const checkoutButtonLink = customer ? checkoutPath : "/account"

  const isPendingApproval = cart?.approvals?.some(
    (approval) => approval?.status === ApprovalStatusType.PENDING
  )

  return (
    <Container className="flex flex-col gap-y-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <CartTotals />
      <Divider />
      <PromotionCode cart={cart} />
      <Divider className="my-4" />
      {spendLimitExceeded && (
        <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 p-4 rounded-lg">
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
      <LocalizedClientLink
        href={checkoutButtonLink}
        data-testid="checkout-button"
      >
        <Button
          className="w-full h-12 rounded-xl !font-jxd-medium text-white shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            fontFamily: 'JXD-Medium, sans-serif',
            background: spendLimitExceeded 
              ? '#9CA3AF' 
              : 'linear-gradient(135deg, #FF000F 0%, #CC0000 100%)',
          }}
          onMouseEnter={(e) => {
            if (!spendLimitExceeded) {
              e.currentTarget.style.background = 'linear-gradient(135deg, #CC0000 0%, #990000 100%)'
            }
          }}
          onMouseLeave={(e) => {
            if (!spendLimitExceeded) {
              e.currentTarget.style.background = 'linear-gradient(135deg, #FF000F 0%, #CC0000 100%)'
            }
          }}
          disabled={spendLimitExceeded}
        >
          {customer
            ? spendLimitExceeded
              ? "Spending Limit Exceeded"
              : "Secure Checkout"
            : "Log in to Checkout"}
        </Button>
      </LocalizedClientLink>
      {!!customer && (
        <RequestQuoteConfirmation>
          <Button
            className="w-full h-11 rounded-xl border border-gray-300 hover:border-[#FF000F] text-gray-600 hover:text-white !font-jxd-regular bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#FF000F] hover:to-[#CC0000] transition-all duration-300 hover:shadow-lg"
            style={{ fontFamily: 'JXD-Regular, sans-serif' }}
            variant="secondary"
            disabled={isPendingApproval}
          >
            Request Quote
          </Button>
        </RequestQuoteConfirmation>
      )}
      {!customer && (
        <RequestQuotePrompt>
          <Button
            className="w-full h-11 rounded-xl border border-gray-300 hover:border-[#FF000F] text-gray-600 hover:text-white !font-jxd-regular bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#FF000F] hover:to-[#CC0000] transition-all duration-300 hover:shadow-lg"
            style={{ fontFamily: 'JXD-Regular, sans-serif' }}
            variant="secondary"
            disabled={isPendingApproval}
          >
            Request Quote
          </Button>
        </RequestQuotePrompt>
      )}

      <Button
        onClick={handleEmptyCart}
        className="w-full h-10 rounded-xl border border-gray-300 hover:border-red-500 text-gray-500 hover:text-white !font-jxd-light bg-gradient-to-r from-gray-50 to-gray-100 hover:from-red-500 hover:to-red-600 transition-all duration-300 hover:shadow-lg"
        style={{ fontFamily: 'JXD-Light, sans-serif' }}
        variant="secondary"
        disabled={isPendingApproval}
      >
        Empty Cart
      </Button>
    </Container>
  )
}

export default Summary
