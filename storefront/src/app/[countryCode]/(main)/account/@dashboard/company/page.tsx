import { retrieveCompany } from "@/lib/data/companies"
import { retrieveCustomer } from "@/lib/data/customer"
import { listRegions } from "@/lib/data/regions"
import ApprovalSettingsCard from "@/modules/account/components/approval-settings-card"
import CompanyCard from "@/modules/account/components/company-card"
import EmployeesCard from "@/modules/account/components/employees-card"
import InviteEmployeeCard from "@/modules/account/components/invite-employee-card"
import { Heading } from "@medusajs/ui"
import { notFound } from "next/navigation"

export default async function Company() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !customer?.employee?.company) return notFound()

  const company = await retrieveCompany(customer.employee.company.id)

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-[#FF000F] to-[#CC0000] rounded-full"></div>
          <Heading level="h2" className="!font-jxd-bold text-xl text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
            Company Information
          </Heading>
        </div>
        <CompanyCard company={company} regions={regions} />
      </div>
      
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-[#FF000F] to-[#CC0000] rounded-full"></div>
          <Heading level="h2" className="!font-jxd-bold text-xl text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
            Order Approval Settings
          </Heading>
        </div>
        <ApprovalSettingsCard company={company} customer={customer} />
      </div>
      
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-[#FF000F] to-[#CC0000] rounded-full"></div>
          <Heading level="h2" className="!font-jxd-bold text-xl text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
            Team Members
          </Heading>
        </div>
        <EmployeesCard company={company} />
      </div>
      
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-3">
          <div className="w-1 h-6 bg-gradient-to-b from-[#FF000F] to-[#CC0000] rounded-full"></div>
          <Heading level="h2" className="!font-jxd-bold text-xl text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>
            Invite New Member
          </Heading>
        </div>
        <InviteEmployeeCard company={company} />
      </div>
    </div>
  )
}
