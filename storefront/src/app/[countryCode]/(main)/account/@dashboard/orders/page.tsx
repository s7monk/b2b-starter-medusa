import { listApprovals } from "@/lib/data/approvals"
import { retrieveCompany } from "@/lib/data/companies"
import { retrieveCustomer } from "@/lib/data/customer"
import { listOrders } from "@/lib/data/orders"
import OrderOverview from "@/modules/account/components/order-overview"
import PendingCustomerApprovals from "@/modules/account/components/pending-customer-approvals"
import { ApprovalStatusType } from "@/types/approval"
import { Heading } from "@medusajs/ui"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
}

export default async function Orders() {
  const customer = await retrieveCustomer()
  const orders = await listOrders()

  const { approval_settings } =
    (await retrieveCompany(customer?.employee?.company_id!)) || {}

  const approval_required =
    approval_settings?.requires_admin_approval ||
    approval_settings?.requires_sales_manager_approval

  const { carts_with_approvals } = await listApprovals({
    status: ApprovalStatusType.PENDING,
  })

  return (
    <div
      className="w-full flex flex-col gap-y-6"
      data-testid="orders-page-wrapper"
    >
      <div className="flex items-center gap-x-3">
        <div className="w-1 h-6 bg-gradient-to-b from-[#FF000F] to-[#CC0000] rounded-full"></div>
        <Heading className="!font-jxd-bold text-xl text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>Orders</Heading>
      </div>
      {approval_required && (
        <div>
          <Heading level="h2" className="!font-jxd-medium text-slate-700 mb-4" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
            Pending Approvals
          </Heading>

          <PendingCustomerApprovals cartsWithApprovals={carts_with_approvals} />
        </div>
      )}
      <div>
        <Heading level="h2" className="!font-jxd-medium text-slate-700 mb-4" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
          Completed Orders
        </Heading>

        <OrderOverview orders={orders} />
      </div>
    </div>
  )
}
