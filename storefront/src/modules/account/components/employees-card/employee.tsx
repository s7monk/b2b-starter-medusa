"use client"

import { currencySymbolMap } from "@/lib/constants"
import { deleteEmployee, updateEmployee } from "@/lib/data/companies"
import {
  getOrderTotalInSpendWindow,
  getSpendWindow,
} from "@/lib/util/check-spending-limit"
import { formatAmount } from "@/modules/common/components/amount-cell"
import Button from "@/modules/common/components/button"
import NativeSelect from "@/modules/common/components/native-select"
import {
  B2BCustomer,
  QueryCompany,
  QueryEmployee,
  StoreUpdateEmployee,
} from "@/types"
import { HttpTypes } from "@medusajs/types"
import { CurrencyInput, Prompt, Text, clx, toast } from "@medusajs/ui"
import { useState } from "react"

const RemoveEmployeePrompt = ({ employee }: { employee: QueryEmployee }) => {
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = async () => {
    setIsRemoving(true)
    await deleteEmployee(employee.company_id, employee.id).catch(() => {
      toast.error("Error deleting employee")
    })
    setIsRemoving(false)

    toast.success("Employee deleted")
  }

  return (
    <Prompt variant="danger">
      <Prompt.Trigger asChild>
        <Button 
          variant="transparent"
          className="!font-jxd-medium text-red-600 hover:text-red-700 hover:bg-red-50 !rounded-full px-4 py-2"
          style={{ fontFamily: 'JXD-Medium, sans-serif' }}
        >
          Remove
        </Button>
      </Prompt.Trigger>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title className="!font-jxd-medium" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Remove Employee</Prompt.Title>
          <Prompt.Description className="!font-jxd-regular" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
            Are you sure you want to remove{" "}
            <strong>{employee.customer.email}</strong> from your team? They will
            no longer be able to purchase on behalf of your company.
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel className="h-10 !rounded-full shadow-borders-base !font-jxd-medium" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
            Cancel
          </Prompt.Cancel>
          <Prompt.Action
            className="h-10 px-4 !rounded-full shadow-none !font-jxd-medium !bg-red-600 hover:!bg-red-700"
            style={{ fontFamily: 'JXD-Medium, sans-serif' }}
            onClick={handleRemove}
          >
            Remove
          </Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  )
}

const Employee = ({
  employee,
  company,
  orders,
  customer,
}: {
  employee: QueryEmployee
  company: QueryCompany
  orders: HttpTypes.StoreOrder[]
  customer: B2BCustomer | null
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [employeeData, setEmployeeData] = useState({
    id: employee.id,
    company_id: employee.company_id,
    spending_limit: employee.spending_limit.toString(),
    is_admin: employee.is_admin,
  })

  const isCurrentUser = employee.customer.id === customer?.id

  const handleSubmit = async () => {
    const updateData = {
      ...employeeData,
      spending_limit: parseFloat(employeeData.spending_limit),
    }

    setIsSaving(true)
    await updateEmployee(updateData as StoreUpdateEmployee).catch(() => {
      toast.error("Error updating employee")
    })

    setIsSaving(false)
    setIsEditing(false)

    toast.success("Employee updated")
  }

  const spent = getOrderTotalInSpendWindow(orders, getSpendWindow(company)) || 0
  const amountSpent = formatAmount(spent, company.currency_code!)

  return (
    <div className="flex flex-col border-b border-slate-100 last:border-b-0">
      <div className="flex justify-between p-6 items-start">
        <div className="flex flex-col gap-y-2 flex-1">
          <div className="flex items-center gap-x-2">
            <Text className="!font-jxd-medium text-slate-900" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
              {employee.customer.first_name} {employee.customer.last_name}
            </Text>
            {isCurrentUser && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs !font-jxd-medium rounded-full" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                You
              </span>
            )}
            {employee.is_admin && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs !font-jxd-medium rounded-full" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
                Admin
              </span>
            )}
          </div>
          <div className="flex gap-x-4 small:flex-row flex-col">
            <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{employee.customer.email}</Text>
            {employee.customer.phone && (
              <>
                <Text className="!font-jxd-regular text-slate-400 hidden small:block" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>•</Text>
                <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{employee.customer.phone}</Text>
              </>
            )}
          </div>
          <div className="flex items-center gap-x-2">
            <Text className="!font-jxd-regular text-slate-500 text-sm" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              Spent: <span className="!font-jxd-medium text-slate-700" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>{amountSpent}</span> / {" "}
              {employee.spending_limit > 0
                ? <span className="!font-jxd-medium text-slate-700" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>{formatAmount(employee.spending_limit, company.currency_code!)}</span>
                : <span className="!font-jxd-medium text-green-600" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>No limit</span>
              }
            </Text>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          {isEditing ? (
            <>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                className="!font-jxd-medium px-4 py-2 border-slate-300 text-slate-600 hover:border-slate-400 !rounded-full"
                style={{ fontFamily: 'JXD-Medium, sans-serif' }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                isLoading={isSaving}
                className="!font-jxd-medium px-4 py-2 !bg-[#FF000F] hover:!bg-[#E6000E] !rounded-full"
                style={{ fontFamily: 'JXD-Medium, sans-serif' }}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              {!isCurrentUser && customer?.employee?.is_admin && <RemoveEmployeePrompt employee={employee} />}
              <Button
                variant="secondary"
                onClick={() => setIsEditing((prev) => !prev)}
                className="!font-jxd-medium px-4 py-2 border-slate-300 text-slate-600 hover:border-[#FF000F] hover:text-[#FF000F] !rounded-full transition-colors duration-200"
                style={{ fontFamily: 'JXD-Medium, sans-serif' }}
              >
                Edit
              </Button>
            </>
          )}
        </div>
      </div>
      <form
        className={clx(
          "bg-slate-50 grid grid-cols-2 gap-6 border-t border-slate-100 transition-all duration-300 ease-in-out",
          {
            "max-h-[120px] opacity-100 p-6": isEditing,
            "max-h-0 h-0 opacity-0 border-t-0": !isEditing,
          }
        )}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            handleSubmit()
          }
        }}
      >
        <div className="flex flex-col gap-y-3">
          <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Spending Limit</Text>
          <CurrencyInput
            symbol={currencySymbolMap[company.currency_code!]}
            code={company.currency_code!}
            className="bg-white !rounded-lg border-slate-200"
            name="spending_limit"
            value={employeeData.spending_limit}
            onChange={(e) => {
              setEmployeeData({
                ...employeeData,
                spending_limit: e.target.value.replace(/[^0-9.]/g, ""),
              })
            }}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Permissions</Text>
          <NativeSelect
            className="bg-white !rounded-lg border-slate-200"
            name="permissions"
            value={employeeData.is_admin ? "true" : "false"}
            disabled={!customer?.employee?.is_admin}
            onChange={(e) => {
              setEmployeeData({
                ...employeeData,
                is_admin: e.target.value === "true",
              })
            }}
          >
            <option value="true">Admin</option>
            <option value="false">Employee</option>
          </NativeSelect>
        </div>
      </form>
    </div>
  )
}

export default Employee
