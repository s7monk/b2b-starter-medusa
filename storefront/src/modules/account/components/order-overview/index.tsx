"use client"

import OrderCard from "@/modules/account/components/order-card"
import Button from "@/modules/common/components/button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-2 w-full">
        {orders.map((o) => (
          <div key={o.id}>
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-4 py-8"
      data-testid="no-orders-container"
    >
      <h2 className="!font-jxd-medium text-slate-800" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Nothing to see here</h2>
      <p className="!font-jxd-light text-slate-600" style={{ fontFamily: 'JXD-Light, sans-serif' }}>
        You don&apos;t have any orders yet, let us change that {":)"}
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button 
            data-testid="continue-shopping-button"
            className="!font-jxd-medium !bg-[#FF000F] hover:!bg-[#E6000E] !rounded-full"
            style={{ fontFamily: 'JXD-Medium, sans-serif' }}
          >
            Continue shopping
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
