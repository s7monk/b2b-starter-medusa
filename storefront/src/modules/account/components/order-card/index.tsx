import { convertToLocale } from "@/lib/util/money"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import CalendarIcon from "@/modules/common/icons/calendar"
import DocumentIcon from "@/modules/common/icons/document"
import { HttpTypes } from "@medusajs/types"
import { Button, clx, Container } from "@medusajs/ui"
import Image from "next/image"
import { useMemo } from "react"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const createdAt = new Date(order.created_at)
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  return (
    <>
      <Container className="bg-white flex small:flex-row flex-col p-6 rounded-xl border border-slate-200 small:justify-between small:items-center gap-y-3 items-start shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex gap-x-4 items-center">
          <div className="flex min-w-10">
            {order.items?.slice(0, 3).map((i, index) => {
              const numItems = order.items?.length ?? 0

              return (
                <div
                  key={i.id}
                  className={clx(
                    "block w-8 h-8 border-2 border-white bg-neutral-100 p-2 bg-cover bg-center rounded-lg ml-[-6px] shadow-sm",
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
                    src={i.thumbnail!}
                    alt={i.title}
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

          <div
            className="flex items-center gap-x-2 !font-jxd-regular text-slate-600"
            style={{ fontFamily: 'JXD-Regular, sans-serif' }}
            data-testid="order-created-at"
          >
            <CalendarIcon className="w-4 h-4" />
            <span className="text-sm">
              {createdAt.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-x-2 !font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
            <DocumentIcon className="w-4 h-4" />
            <span className="text-sm" data-testid="order-display-id">#{order.display_id}</span>
          </div>
        </div>

        <div className="flex gap-x-6 small:divide-x divide-slate-200 small:justify-normal justify-between w-full small:w-auto items-center">
          <div className="flex items-center gap-x-3 !font-jxd-medium text-slate-700" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
            <span className="text-lg font-semibold" data-testid="order-amount">
              {convertToLocale({
                amount: order.total,
                currency_code: order.currency_code,
              })}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-sm">{`${numberOfLines} ${
              numberOfLines > 1 ? "items" : "item"
            }`}</span>
          </div>

          <div className="flex items-center gap-x-3 pl-6">
            <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
              <Button
                data-testid="card-details-link"
                variant="secondary"
                className="!rounded-full text-xs !font-jxd-medium border-slate-300 text-slate-600 hover:border-[#FF000F] hover:text-[#FF000F] transition-colors duration-200"
                style={{ fontFamily: 'JXD-Medium, sans-serif' }}
              >
                Details
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </Container>
    </>
  )
}

export default OrderCard
