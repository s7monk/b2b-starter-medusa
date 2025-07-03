"use client"

import Button from "@/modules/common/components/button"
import { B2BCustomer } from "@/types"
import { Container, Text, toast } from "@medusajs/ui"

const SecurityCard = ({ customer }: { customer: B2BCustomer }) => {
  return (
    <div className="h-fit">
      <Container className="p-0 overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-2 gap-6 border-b border-slate-100 p-6">
          <div className="flex flex-col gap-y-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Password</Text>
            <Text className="!font-jxd-light text-slate-600" style={{ fontFamily: 'JXD-Light, sans-serif' }}>••••••••••••••••</Text>
          </div>
          <div className="flex flex-col gap-y-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Last Updated</Text>
            <Text className="!font-jxd-light text-slate-600" style={{ fontFamily: 'JXD-Light, sans-serif' }}>Not available</Text>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 bg-slate-50 p-6">
          <Button
            variant="secondary"
            onClick={() => toast.info("Password change feature will be available soon")}
            className="!font-jxd-medium px-6 py-2 border-slate-300 text-slate-600 hover:border-[#FF000F] hover:text-[#FF000F] !rounded-full transition-colors duration-200"
            style={{ fontFamily: 'JXD-Medium, sans-serif' }}
          >
            Change Password
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default SecurityCard
