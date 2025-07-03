import OrderCard from "@/modules/account/components/order-card"
import PreviouslyPurchasedProducts from "@/modules/account/components/previously-purchased"
import { B2BCustomer } from "@/types/global"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"

type OverviewProps = {
  customer: B2BCustomer | null
  orders: HttpTypes.StoreOrder[] | null
  region?: HttpTypes.StoreRegion | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper" className="w-full">
      <div className="hidden small:block">
        <div className="flex justify-between items-center mb-8">
          <h1 
            className="!font-jxd-bold text-2xl text-slate-900 tracking-tight" 
            style={{ fontFamily: 'JXD-Bold, sans-serif' }}
            data-testid="welcome-message" 
            data-value={customer?.first_name}
          >
            Hello {customer?.first_name}
          </h1>
          <div className="text-right">
            <p className="!font-jxd-regular text-sm text-slate-500 mb-1" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              Signed in as:
            </p>
            <span
              className="!font-jxd-medium text-slate-700"
              style={{ fontFamily: 'JXD-Medium, sans-serif' }}
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="!font-jxd-bold text-lg text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
                  Profile
                </h3>
                <div className="w-8 h-1 bg-gradient-to-r from-[#FF000F] to-[#CC0000] rounded-full"></div>
              </div>
              <div className="flex items-baseline gap-x-3">
                <span
                  className="!font-jxd-bold text-3xl text-[#FF000F] leading-none"
                  style={{ fontFamily: 'JXD-Bold, sans-serif' }}
                  data-testid="customer-profile-completion"
                  data-value={getProfileCompletion(customer)}
                >
                  {getProfileCompletion(customer)}%
                </span>
                <span className="!font-jxd-regular text-sm text-slate-500 uppercase tracking-wide" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
                  Completed
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="!font-jxd-bold text-lg text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
                  Addresses
                </h3>
                <div className="w-8 h-1 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full"></div>
              </div>
              <div className="flex items-baseline gap-x-3">
                <span
                  className="!font-jxd-bold text-3xl text-slate-700 leading-none"
                  style={{ fontFamily: 'JXD-Bold, sans-serif' }}
                  data-testid="addresses-count"
                  data-value={customer?.addresses?.length || 0}
                >
                  {customer?.addresses?.length || 0}
                </span>
                <span className="!font-jxd-regular text-sm text-slate-500 uppercase tracking-wide" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
                  Saved
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-[#FF000F] to-[#CC0000] rounded-full"></div>
                <Heading level="h3" className="!font-jxd-bold text-xl text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
                  Recent orders
                </Heading>
              </div>
            </div>
            <div className="p-6">
              <div
                className="space-y-3"
                data-testid="orders-wrapper"
              >
                {orders && orders.length > 0 ? (
                  orders
                    .slice(0, 5)
                    .map((order) => <OrderCard order={order} key={order.id} />)
                ) : (
                  <div className="text-center py-12">
                    <p className="!font-jxd-regular text-slate-500" style={{ fontFamily: 'JXD-Regular, sans-serif' }} data-testid="no-orders-message">
                      No recent orders
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-slate-400 to-slate-500 rounded-full"></div>
                <Heading level="h3" className="!font-jxd-bold text-xl text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
                  Previously purchased items
                </Heading>
              </div>
            </div>
            <div className="p-6">
              <div
                className="space-y-3"
                data-testid="previously-purchased-items-wrapper"
              >
                {orders && orders.length > 0 ? (
                  <PreviouslyPurchasedProducts orders={orders} />
                ) : (
                  <div className="text-center py-12">
                    <p 
                      className="!font-jxd-regular text-slate-500" 
                      style={{ fontFamily: 'JXD-Regular, sans-serif' }}
                      data-testid="no-previously-purchased-items-message"
                    >
                      No previously purchased items
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: B2BCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
