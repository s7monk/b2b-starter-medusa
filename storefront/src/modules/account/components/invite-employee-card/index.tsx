"use client"

import Button from "@/modules/common/components/button"
import Input from "@/modules/common/components/input"
import { QueryCompany } from "@/types"
import { Container, Text, toast } from "@medusajs/ui"
import { useState } from "react"

const InviteEmployeeCard = ({ company }: { company: QueryCompany }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Container className="p-0 overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="grid small:grid-cols-4 grid-cols-2 gap-6 p-6 border-b border-slate-100">
        <div className="flex flex-col gap-y-3">
          <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>First Name</Text>
          <Input 
            name="first_name" 
            label="First name" 
            value={formData.first_name}
            onChange={(e) => handleInputChange("first_name", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Last Name</Text>
          <Input 
            name="last_name" 
            label="Last name"
            value={formData.last_name}
            onChange={(e) => handleInputChange("last_name", e.target.value)}
          />
        </div>
        <div className="flex flex-col col-span-2 gap-y-3">
          <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Email Address</Text>
          <Input 
            name="email" 
            label="Enter an email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 bg-slate-50 p-6">
        <Button 
          variant="primary" 
          onClick={() => toast.info("Employee invitation feature will be available soon")}
          className="!font-jxd-medium px-6 py-2 !bg-[#FF000F] hover:!bg-[#E6000E] !rounded-full"
          style={{ fontFamily: 'JXD-Medium, sans-serif' }}
        >
          Send Invitation
        </Button>
      </div>
    </Container>
  )
}

export default InviteEmployeeCard
