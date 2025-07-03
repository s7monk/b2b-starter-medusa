import QuoteStatusBadge from "@/app/[countryCode]/(main)/account/@dashboard/quotes/components/quote-status-badge"
import { convertToLocale } from "@/lib/util/money"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { StoreQuoteResponse } from "@/types"
import { CalendarMini, DocumentText } from "@medusajs/icons"
import { Button, clx, Container } from "@medusajs/ui"
import Image from "next/image"
import { useMemo } from "react"

type QuoteCardProps = {
  quote: StoreQuoteResponse["quote"]
}

const QuoteCard = ({ quote }: QuoteCardProps) => {
  const { draft_order: order } = quote
  const createdAt = new Date(order.created_at)

  const numberOfLines = useMemo(
    () =>
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0,
    [order]
  )

  return (
    <Container className="bg-white border border-slate-200 hover:border-slate-300 transition-colors duration-200 shadow-sm hover:shadow-md rounded-lg">
      <div className="flex small:flex-row flex-col p-4 small:justify-between small:items-center gap-y-3 items-start">
        <div className="flex gap-x-6 items-center">
          <div className="flex">
            {order.items?.slice(0, 3).map((item, index) => {
              const numItems = order.items?.length ?? 0

              return (
                <div
                  key={item.id}
                  className={clx(
                    "block w-8 h-8 bg-slate-100 border-2 border-white bg-cover bg-center rounded-lg ml-[-6px] p-2 shadow-sm",
                    {
                      "-rotate-3": index === 0 && numItems > 1,
                      "rotate-0": index === 0 && numItems === 1,
                      "rotate-3":
                        (index === 1 && numItems === 2) ||
                        (index === 2 && numItems > 2),
                    }
                  )}
                >
                  <Image
                    src={item.thumbnail!}
                    alt={item.title}
                    className={clx("h-full w-full object-cover object-center rounded", {
                      "-rotate-3": index === 0 && numItems > 1,
                      "rotate-0": index === 0 && numItems === 1,
                      "rotate-3":
                        (index === 1 && numItems === 2) ||
                        (index === 2 && numItems > 2),
                    })}
                    draggable={false}
                    quality={50}
                    width={24}
                    height={24}
                  />
                </div>
              )
            })}
          </div>

          <div className="flex items-center gap-x-4">
            <div className="flex text-sm items-center text-slate-600 !font-jxd-regular" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              <CalendarMini className="inline-block mr-2 w-4 h-4" />
              {createdAt.getDate()}-{createdAt.getMonth() + 1}-{createdAt.getFullYear()}
            </div>

            <div className="flex text-sm items-center text-slate-600 !font-jxd-regular" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              <DocumentText className="inline-block mr-2 w-4 h-4" />
              <span className="font-medium">#{order.display_id}</span>
            </div>

            <div className="flex items-center">
              <QuoteStatusBadge status={quote.status} />
            </div>
          </div>
        </div>

        <div className="flex gap-x-6 small:divide-x divide-slate-200 small:justify-normal justify-between w-full small:w-auto items-center">
          <div className="flex items-center gap-x-3 !font-jxd-medium text-slate-700" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
            <span className="text-lg font-semibold">
              {convertToLocale({
                amount: order.total,
                currency_code: order.currency_code,
              })}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-sm">
              {`${numberOfLines} ${numberOfLines > 1 ? "items" : "item"}`}
            </span>
          </div>

          <div className="pl-6">
            <LocalizedClientLink href={`/account/quotes/details/${quote.id}`}>
              <Button 
                variant="secondary" 
                className="!rounded-full text-xs !font-jxd-medium border-slate-300 text-slate-600 hover:border-[#FF000F] hover:text-[#FF000F] transition-colors duration-200"
                style={{ fontFamily: 'JXD-Medium, sans-serif' }}
              >
                See details
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default QuoteCard
