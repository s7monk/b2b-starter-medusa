import ApprovedApprovalRequestsAdminList from "@/modules/account/components/approval-requests-admin-list/approved-list"
import PendingApprovalRequestsAdminList from "@/modules/account/components/approval-requests-admin-list/pending-list"
import RejectedApprovalRequestsAdminList from "@/modules/account/components/approval-requests-admin-list/rejected-list"
import { Heading } from "@medusajs/ui"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Approvals",
  description: "Overview of your pending approvals.",
}

export default async function Approvals({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const urlSearchParams = await searchParams

  return (
    <div className="w-full flex flex-col gap-y-6">
      <div className="flex items-center gap-x-3">
        <div className="w-1 h-6 bg-gradient-to-b from-[#FF000F] to-[#CC0000] rounded-full"></div>
        <Heading className="!font-jxd-bold text-xl text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>Approvals</Heading>
      </div>

      <div className="space-y-6">
        <Heading level="h2" className="!font-jxd-medium text-slate-700" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
          Pending
        </Heading>
        <Suspense fallback={<div className="!font-jxd-light text-slate-500" style={{ fontFamily: 'JXD-Light, sans-serif' }}>Loading...</div>}>
          <PendingApprovalRequestsAdminList searchParams={urlSearchParams} />
        </Suspense>
      </div>

      <div className="space-y-6">
        <Heading level="h2" className="!font-jxd-medium text-slate-700" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
          Approved
        </Heading>
        <Suspense fallback={<div className="!font-jxd-light text-slate-500" style={{ fontFamily: 'JXD-Light, sans-serif' }}>Loading...</div>}>
          <ApprovedApprovalRequestsAdminList searchParams={urlSearchParams} />
        </Suspense>
      </div>

      <div className="space-y-6">
        <Heading level="h2" className="!font-jxd-medium text-slate-700" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
          Rejected
        </Heading>
        <Suspense fallback={<div className="!font-jxd-light text-slate-500" style={{ fontFamily: 'JXD-Light, sans-serif' }}>Loading...</div>}>
          <RejectedApprovalRequestsAdminList searchParams={urlSearchParams} />
        </Suspense>
      </div>
    </div>
  )
}
