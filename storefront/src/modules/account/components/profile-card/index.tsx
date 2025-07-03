"use client"

import { updateCustomer } from "@/lib/data/customer"
import Button from "@/modules/common/components/button"
import Input from "@/modules/common/components/input"
import { B2BCustomer } from "@/types/global"
import { HttpTypes } from "@medusajs/types"
import { Container, Text, clx, toast } from "@medusajs/ui"
import { useState } from "react"

const ProfileCard = ({ customer }: { customer: B2BCustomer }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const { first_name, last_name, phone } = customer

  const [customerData, setCustomerData] = useState({
    first_name: first_name || "",
    last_name: last_name || "",
    phone: phone || "",
  } as HttpTypes.StoreUpdateCustomer)

  const handleSave = async () => {
    setIsSaving(true)
    await updateCustomer(customerData).catch(() => {
      toast.error("Error updating customer")
    })
    setIsSaving(false)
    setIsEditing(false)

    toast.success("Customer updated")
  }

  return (
    <div className="h-fit">
      <Container className="p-0 overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm">
        <form
          className={clx(
            "grid grid-cols-2 gap-6 border-b border-slate-100 overflow-hidden transition-all duration-300 ease-in-out",
            {
              "max-h-[280px] opacity-100 p-6": isEditing,
              "max-h-0 opacity-0": !isEditing,
            }
          )}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleSave()
            }
          }}
        >
          <div className="flex flex-col gap-y-3">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>First Name</Text>
            <Input
              label="First Name"
              name="first_name"
              value={customerData.first_name}
              onChange={(e) =>
                setCustomerData({
                  ...customerData,
                  first_name: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Last Name</Text>
            <Input
              label="Last Name"
              name="last_name"
              value={customerData.last_name}
              onChange={(e) =>
                setCustomerData({
                  ...customerData,
                  last_name: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Email</Text>
            <Text className="!font-jxd-regular text-slate-500 px-3 py-2 bg-slate-50 rounded-lg border" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{customer.email}</Text>
          </div>
          <div className="flex flex-col gap-y-3">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Phone</Text>
            <Input
              label="Phone"
              name="phone"
              value={customerData.phone}
              onChange={(e) =>
                setCustomerData({ ...customerData, phone: e.target.value })
              }
            />
          </div>
        </form>
        <div
          className={clx(
            "grid grid-cols-2 gap-6 border-b border-slate-100 transition-all duration-300 ease-in-out",
            {
              "opacity-0 max-h-0": isEditing,
              "opacity-100 max-h-[240px] p-6": !isEditing,
            }
          )}
        >
          <div className="flex flex-col gap-y-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>First Name</Text>
            <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{customer.first_name || "Not provided"}</Text>
          </div>
          <div className="flex flex-col gap-y-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Last Name</Text>
            <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{customer.last_name || "Not provided"}</Text>
          </div>
          <div className="flex flex-col gap-y-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Email</Text>
            <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{customer.email}</Text>
          </div>
          <div className="flex flex-col gap-y-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Phone</Text>
            <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{customer.phone || "Not provided"}</Text>
          </div>
        </div>

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
                Save Changes
              </Button>
            </>
          ) : (
            <Button 
              variant="secondary" 
              onClick={() => setIsEditing(true)}
              className="!font-jxd-medium px-6 py-2 border-slate-300 text-slate-600 hover:border-[#FF000F] hover:text-[#FF000F] !rounded-full transition-colors duration-200"
              style={{ fontFamily: 'JXD-Medium, sans-serif' }}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </Container>
    </div>
  )
}

export default ProfileCard
