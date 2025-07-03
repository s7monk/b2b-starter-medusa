import { listApprovals } from "@/lib/data/approvals"
import ApprovalCard from "@/modules/account/components/approval-card"
import ResourcePagination from "@/modules/account/components/resource-pagination"
import { ApprovalStatusType } from "@/types/approval"
import { Text } from "@medusajs/ui"

export default async function RejectedApprovalRequestsAdminList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const pageParam = `rejectedPage`
  const currentPage = Number(searchParams[pageParam]) || 1
  const limit = 5

  let { carts_with_approvals, count } = await listApprovals({
    status: ApprovalStatusType.REJECTED,
    offset: (currentPage - 1) * limit,
    limit,
  })

  const totalPages = Math.ceil((count || 0) / limit)

  if (carts_with_approvals.length > 0) {
    return (
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex flex-col gap-y-3">
          {carts_with_approvals.map((cartWithApprovals) => (
            <ApprovalCard
              key={cartWithApprovals.id}
              cartWithApprovals={cartWithApprovals}
              type="admin"
            />
          ))}
        </div>

        {totalPages > 1 && (
          <ResourcePagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageParam={pageParam}
          />
        )}
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center gap-y-4 py-8 bg-red-50 rounded-lg border border-red-200">
      <Text className="!font-jxd-medium text-red-800" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
        No rejected requests
      </Text>
      <Text className="!font-jxd-light text-red-700 text-sm" style={{ fontFamily: 'JXD-Light, sans-serif' }}>
        Rejected requests will appear here.
      </Text>
    </div>
  )
}
