"use client"

import { currencySymbolMap } from "@/lib/constants"
import { updateCompany } from "@/lib/data/companies"
import Button from "@/modules/common/components/button"
import Input from "@/modules/common/components/input"
import Select from "@/modules/common/components/native-select"
import {
  ModuleCompanySpendingLimitResetFrequency,
  StoreCompanyResponse,
  StoreUpdateCompany,
} from "@/types"
import { AdminRegionCountry, HttpTypes } from "@medusajs/types"
import { Container, Text, clx, toast } from "@medusajs/ui"
import { useState } from "react"

const CompanyCard = ({
  company,
  regions,
}: StoreCompanyResponse & { regions: HttpTypes.StoreRegion[] }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const { updated_at, created_at, employees, ...companyUpdateData } = company

  const [companyData, setCompanyData] = useState(
    companyUpdateData as StoreUpdateCompany
  )

  const handleSave = async () => {
    setIsSaving(true)
    await updateCompany(companyData).catch(() => {
      toast.error("Error updating company")
    })
    setIsSaving(false)
    setIsEditing(false)

    toast.success("Company updated")
  }

  const currenciesInRegions = Array.from(
    new Set(regions.map((region) => region.currency_code))
  )

  const countriesInRegions = Array.from(
    new Set(
      regions.flatMap((region) => region.countries).map((country) => country)
    )
  ) as AdminRegionCountry[]

  return (
    <div className="h-fit">
      <Container className="p-0 overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm">
        <form
          className={clx(
            "grid grid-cols-2 gap-6 border-b border-slate-100 overflow-hidden transition-all duration-300 ease-in-out",
            {
              "max-h-[480px] opacity-100 p-6": isEditing,
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
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Company Name</Text>
            <Input
              label="Company Name"
              name="name"
              value={companyData.name || ""}
              onChange={(e) =>
                setCompanyData({ ...companyData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Email</Text>
            <Input
              label="Email"
              name="email"
              value={companyData.email || ""}
              onChange={(e) =>
                setCompanyData({ ...companyData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Phone</Text>
            <Input
              label="Phone"
              name="phone"
              value={companyData.phone || ""}
              onChange={(e) =>
                setCompanyData({ ...companyData, phone: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Address</Text>
            <Input
              label="Address"
              name="address"
              value={companyData.address || ""}
              onChange={(e) =>
                setCompanyData({ ...companyData, address: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>City</Text>
            <Input
              label="City"
              name="city"
              value={companyData.city || ""}
              onChange={(e) =>
                setCompanyData({ ...companyData, city: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>State</Text>
            <Input
              label="State"
              name="state"
              value={companyData.state || ""}
              onChange={(e) =>
                setCompanyData({ ...companyData, state: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Zip Code</Text>
            <Input
              label="Zip"
              name="zip"
              value={companyData.zip || ""}
              onChange={(e) =>
                setCompanyData({ ...companyData, zip: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Country</Text>
            <Select
              name="country"
              value={companyData.country || ""}
              onChange={(e) =>
                setCompanyData({ ...companyData, country: e.target.value })
              }
            >
              {countriesInRegions.map((country, index) => (
                <option key={index} value={country.id}>
                  {country.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-y-3">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Currency</Text>
            <Select
              name="currency_code"
              value={companyData.currency_code || ""}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  currency_code: e.target.value as string,
                })
              }
            >
              {currenciesInRegions.map((currency) => (
                <option key={currency} value={currency}>
                  {currency.toUpperCase()} ({currencySymbolMap[currency]})
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-y-3 col-span-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
              Spending Limit Reset Frequency
            </Text>
            <Select
              name="spending_limit_reset_frequency"
              value={companyData.spending_limit_reset_frequency}
              onChange={(e) =>
                setCompanyData({
                  ...companyData,
                  spending_limit_reset_frequency: e.target
                    .value as ModuleCompanySpendingLimitResetFrequency,
                })
              }
            >
              {Object.values(ModuleCompanySpendingLimitResetFrequency).map(
                (value) => (
                  <option key={value} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </option>
                )
              )}
            </Select>
          </div>
        </form>
        <div
          className={clx(
            "grid grid-cols-2 gap-6 border-b border-slate-100 transition-all duration-300 ease-in-out",
            {
              "opacity-0 max-h-0": isEditing,
              "opacity-100 max-h-[320px] p-6": !isEditing,
            }
          )}
        >
          <div className="flex flex-col gap-y-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Company Name</Text>
            <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{company.name || "Not provided"}</Text>
          </div>
          <div className="flex flex-col gap-y-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Email</Text>
            <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{company.email || "Not provided"}</Text>
          </div>
          <div className="flex flex-col gap-y-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Phone</Text>
            <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>{company.phone || "Not provided"}</Text>
          </div>
          <div className="flex flex-col gap-y-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Address</Text>
            <Text className="!font-jxd-regular text-slate-600 leading-relaxed" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              {company.address || company.city || company.state || company.zip || company.country
                ? `${company.address || ""}${company.address && company.city ? ", " : ""}${company.city || ""}${company.city && company.state ? ", " : ""}${company.state || ""}${company.state && company.zip ? " " : ""}${company.zip || ""}${(company.city || company.state || company.zip) && company.country ? ", " : ""}${company.country?.toUpperCase() || ""}`
                : "Not provided"}
            </Text>
          </div>
          <div className="flex flex-col gap-y-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Currency</Text>
            <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              {company.currency_code
                ? `${company.currency_code?.toUpperCase()} (${currencySymbolMap[company.currency_code!]})`
                : "Not provided"}
            </Text>
          </div>
          <div className="flex flex-col gap-y-2">
            <Text className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>
              Spending Limit Reset Frequency
            </Text>
            <Text className="!font-jxd-regular text-slate-600" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              {company.spending_limit_reset_frequency
                ? company.spending_limit_reset_frequency?.charAt(0).toUpperCase() + company.spending_limit_reset_frequency?.slice(1)
                : "Not configured"}
            </Text>
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
              Edit Company
            </Button>
          )}
        </div>
      </Container>
    </div>
  )
}

export default CompanyCard
