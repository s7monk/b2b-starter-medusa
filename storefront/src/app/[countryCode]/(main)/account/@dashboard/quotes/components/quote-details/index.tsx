"use client"

import { acceptQuote, rejectQuote } from "@/lib/data/quotes"
import { formatAmount } from "@/modules/common/components/amount-cell"
import Button from "@/modules/common/components/button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { PromptModal } from "@/modules/common/components/prompt-modal"
import { B2BCustomer } from "@/types/global"
import { StoreQuoteResponse } from "@/types/quote"
import { ArrowUturnLeft, CheckCircleSolid } from "@medusajs/icons"
import { AdminOrderLineItem, AdminOrderPreview } from "@medusajs/types"
import { Container, Heading, Text, toast } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import React, { useMemo, useState } from "react"
import QuoteMessages from "../quote-messages"
import QuoteStatusBadge from "../quote-status-badge"
import { QuoteTableItem } from "../quote-table"

type QuoteDetailsProps = {
  quote: StoreQuoteResponse["quote"] & {
    customer: B2BCustomer
  }
  preview: AdminOrderPreview
  countryCode: string
}

const QuoteDetails: React.FC<QuoteDetailsProps> = ({
  quote,
  preview,
  countryCode,
}) => {
  const order = quote.draft_order
  const originalItemsMap = useMemo(() => {
    return new Map<string, AdminOrderLineItem>(
      order.items?.map((item: AdminOrderLineItem) => [item.id, item])
    )
  }, [order])
  const router = useRouter()
  const [isAccepting, setIsAccepting] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  return (
    <div className="flex flex-col gap-y-4 p-0">
      <div className="flex gap-3 justify-between items-center mb-2">
        <div className="flex items-center gap-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-[#FF000F] to-[#CC0000] rounded-full"></div>
          <Heading className="!font-jxd-bold text-xl" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>Quote Details</Heading>
        </div>
        
        <LocalizedClientLink
          href="/account/quotes"
          className="flex gap-2 items-center text-ui-fg-subtle hover:text-ui-fg-base"
          data-testid="back-to-overview-button"
        >
          <Button variant="secondary" className="!font-jxd-medium" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
            <ArrowUturnLeft /> Back
          </Button>
        </LocalizedClientLink>
      </div>

      <div className="small:grid small:grid-cols-6 flex flex-col-reverse small:gap-4 gap-2">
        <div className="small:col-span-4 flex flex-col gap-y-3">
          {quote.status === "accepted" && (
            <Container className="p-0">
              <div className="flex items-center justify-between px-6 py-4">
                <Text className="txt-compact-small !font-jxd-regular" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
                  <CheckCircleSolid className="inline-block mr-2 text-green-500 text-lg" />
                  Quote accepted by customer. Order is ready for processing.
                </Text>

                <Button
                  size="small"
                  className="!font-jxd-medium !bg-[#FF000F] hover:!bg-[#E6000E]"
                  style={{ fontFamily: 'JXD-Medium, sans-serif' }}
                  onClick={() =>
                    router.push(
                      `/${countryCode}/account/orders/details/${quote.draft_order_id}`
                    )
                  }
                >
                  View Order
                </Button>
              </div>
            </Container>
          )}

          {preview.items?.map((item) => (
            <Container key={item.id}>
              <QuoteTableItem
                key={item.id}
                item={item}
                originalItem={originalItemsMap.get(item.id)}
                currencyCode={order.currency_code}
              />
            </Container>
          ))}

          <Container className="p-0">
            <div className="py-4">
              <div className="flex items-center justify-between mb-2 px-6">
                <span className="txt-small text-ui-fg-subtle font-semibold" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                  Current Total
                </span>

                <span className="txt-small text-ui-fg-subtle" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
                  {formatAmount(order.total, order.currency_code)}
                </span>
              </div>

              <div className="flex items-center justify-between px-6">
                <span className="txt-small text-ui-fg-subtle font-semibold text-[#FF000F]" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                  New Total
                </span>

                <span className="txt-small text-ui-fg-subtle text-[#FF000F]" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                  {formatAmount(preview.total, order.currency_code)}
                </span>
              </div>
            </div>
          </Container>

          {quote.status === "pending_customer" && (
            <div className="flex gap-x-3 justify-end my-4">
              <PromptModal
                title="Reject Quote?"
                description="Are you sure you want to reject quote? This action is irreversible."
                handleAction={() => {
                  setIsRejecting(true)

                  rejectQuote(quote.id)
                    .catch((e) => toast.error(e.message))
                    .finally(() => setIsRejecting(false))
                }}
                isLoading={isRejecting}
              >
                <Button size="small" variant="secondary" className="!font-jxd-medium" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                  Reject Quote
                </Button>
              </PromptModal>

              <PromptModal
                title="Accept Quote?"
                description="Are you sure you want to accept quote? This action is irreversible."
                handleAction={() => {
                  setIsAccepting(true)

                  acceptQuote(quote.id)
                    .catch((e) => toast.error(e.message))
                    .finally(() => setIsAccepting(false))
                }}
                isLoading={isAccepting}
              >
                <Button size="small" variant="primary" className="!font-jxd-medium !bg-[#FF000F] hover:!bg-[#E6000E]" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                  Accept Quote
                </Button>
              </PromptModal>
            </div>
          )}

          <QuoteMessages quote={quote} preview={preview} />
        </div>

        <div className="col-span-2 flex flex-col gap-y-3">
          <Container className="flex gap-x-3 justify-between">
            <div className="text-sm !font-jxd-regular" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              <span className="font-semibold text-ui-fg-subtle !font-jxd-medium" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Quote ID:</span>{" "}
              #<span className="!font-jxd-bold text-[#FF000F]" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>{quote.draft_order.display_id}</span>
            </div>

            <QuoteStatusBadge status={quote.status} />
          </Container>

          <Container>
            <Heading level="h3" className="mb-2" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
              Customer
            </Heading>

            <div className="text-sm text-ui-fg-subtle" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              <div className="flex justify-between">
                <Text style={{ fontFamily: 'JXD-Regular, sans-serif' }}>Email</Text>
                <Text style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{quote.customer?.email || "-"}</Text>
              </div>

              <div className="flex justify-between">
                <Text style={{ fontFamily: 'JXD-Regular, sans-serif' }}>Phone</Text>
                <Text style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{quote.customer?.phone || "-"}</Text>
              </div>

              <div className="flex justify-between">
                <Text style={{ fontFamily: 'JXD-Regular, sans-serif' }}>Spend Limit</Text>
                <Text style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
                  {(quote.customer?.employee?.spending_limit &&
                    formatAmount(
                      quote.customer?.employee?.spending_limit || 0,
                      order.currency_code.toUpperCase()
                    )) ||
                    "-"}
                </Text>
              </div>
            </div>
          </Container>

          <Container>
            <Heading level="h3" className="mb-2" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
              Company
            </Heading>

            <div className="text-sm text-ui-fg-subtle" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              <div className="flex justify-between">
                <Text style={{ fontFamily: 'JXD-Regular, sans-serif' }}>Name</Text>
                <Text style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{quote.customer?.employee?.company?.name || "-"}</Text>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default QuoteDetails
