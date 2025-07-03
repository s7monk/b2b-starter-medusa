"use client"

import { updateApprovalSettings } from "@/lib/data/companies"
import Button from "@/modules/common/components/button"
import { B2BCustomer, QueryCompany } from "@/types"
import { InformationCircleSolid } from "@medusajs/icons"
import {
  Container,
  Switch,
  Text,
  Tooltip,
  TooltipProvider,
  clx,
  toast,
} from "@medusajs/ui"
import { useState } from "react"

const ApprovalSettingsCard = ({
  company,
  customer,
}: {
  company: QueryCompany
  customer: B2BCustomer
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const { approval_settings } = company

  const [requiresAdminApproval, setRequiresAdminApproval] = useState(
    approval_settings?.requires_admin_approval ?? false
  )

  const handleSave = async () => {
    setIsSaving(true)
    await updateApprovalSettings(company.id, requiresAdminApproval).catch(
      () => {
        toast.error("Error updating approval settings")
      }
    )
    setIsSaving(false)
    setIsEditing(false)

    toast.success("Company updated")
  }

  return (
    <div className="h-fit">
      <Container className="p-0 overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div
          className={clx(
            "grid grid-cols-2 gap-6 border-b border-slate-100 overflow-hidden transition-all duration-200 ease-in-out p-6"
          )}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleSave()
            }
          }}
        >
          <TooltipProvider>
            <div className="flex flex-col gap-y-3">
              <Text className="flex items-center gap-x-2 !font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                Requires Admin Approval
                <Tooltip content="This setting determines whether orders require admin approval before being processed. If enabled, orders will be held until an admin approves them.">
                  <InformationCircleSolid className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                </Tooltip>
              </Text>
              <div className="flex items-center gap-x-3 h-8">
                {isEditing ? (
                  <div className="flex items-center gap-x-2">
                    <Switch
                      checked={requiresAdminApproval}
                      onCheckedChange={(checked) =>
                        setRequiresAdminApproval(checked)
                      }
                    />
                    <Text className="!font-jxd-regular text-slate-600 text-sm" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
                      {requiresAdminApproval ? "Enabled" : "Disabled"}
                    </Text>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-2">
                    <div className={`w-2 h-2 rounded-full ${requiresAdminApproval ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
                      {requiresAdminApproval ? "Yes" : "No"}
                    </Text>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <Text className="flex items-center gap-x-2 !font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                Requires Sales Manager Approval
                <Tooltip content="This setting determines whether orders require sales manager approval before being processed. If enabled, orders will be held until a sales manager approves them.">
                  <InformationCircleSolid className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                </Tooltip>
              </Text>
              <div className="flex items-center gap-x-3 h-8">
                <div className="flex items-center gap-x-2">
                  <div className={`w-2 h-2 rounded-full ${approval_settings?.requires_sales_manager_approval ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
                    {approval_settings?.requires_sales_manager_approval ? "Yes" : "No"}
                  </Text>
                </div>
              </div>
            </div>
          </TooltipProvider>
        </div>

        {customer?.employee?.is_admin && (
          <div className="flex items-center justify-end gap-3 bg-slate-50 p-6">
            {isEditing ? (
              <>
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                  className="!font-jxd-medium px-6 py-2 border-slate-300 text-slate-600 hover:border-slate-400 !rounded-full"
                  style={{ fontFamily: 'JXD-Medium, sans-serif' }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  isLoading={isSaving}
                  className="!font-jxd-medium px-6 py-2 !bg-[#FF000F] hover:!bg-[#E6000E] !rounded-full"
                  style={{ fontFamily: 'JXD-Medium, sans-serif' }}
                >
                  Save Settings
                </Button>
              </>
            ) : (
              <Button 
                variant="secondary" 
                onClick={() => setIsEditing(true)}
                className="!font-jxd-medium px-6 py-2 border-slate-300 text-slate-600 hover:border-[#FF000F] hover:text-[#FF000F] !rounded-full transition-colors duration-200"
                style={{ fontFamily: 'JXD-Medium, sans-serif' }}
              >
                Edit Settings
              </Button>
            )}
          </div>
        )}
      </Container>
    </div>
  )
}

export default ApprovalSettingsCard
