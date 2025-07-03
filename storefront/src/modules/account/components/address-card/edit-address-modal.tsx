"use client"

import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@/lib/data/customer"
import useToggleState from "@/lib/hooks/use-toggle-state"
import CountrySelect from "@/modules/checkout/components/country-select"
import { SubmitButton } from "@/modules/checkout/components/submit-button"
import Button from "@/modules/common/components/button"
import Input from "@/modules/common/components/input"
import Modal from "@/modules/common/components/modal"
import Spinner from "@/modules/common/icons/spinner"
import { B2BCustomer } from "@/types/global"
import { PencilSquare as Edit, Trash } from "@medusajs/icons"
import Phone from "@/modules/common/icons/phone"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, clx } from "@medusajs/ui"
import React, { useActionState, useEffect, useState } from "react"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  customer: B2BCustomer
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  customer,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
    addressId: address.id,
  })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerAddress(address.id)
    setRemoving(false)
  }

  return (
    <>
      <div
        className={clx(
          "border border-slate-200 rounded-2xl p-6 min-h-[240px] h-full w-full flex flex-col justify-between transition-all duration-200 bg-white shadow-sm hover:shadow-md",
          {
            "border-[#FF000F] ring-2 ring-red-100": isActive,
          }
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center gap-x-2">
            <Heading
              className="text-left !font-jxd-medium text-slate-900"
              style={{ fontFamily: 'JXD-Medium, sans-serif' }}
              data-testid="address-name"
            >
              {address.first_name} {address.last_name}
            </Heading>
            {address.company && (
              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs !font-jxd-regular rounded-full" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
                {address.company}
              </span>
            )}
          </div>
          <Text className="flex flex-col text-left !font-jxd-regular text-slate-600 leading-relaxed" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
            <span data-testid="address-address">
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span data-testid="address-postal-city">
              {address.postal_code}, {address.city}
            </span>
            <span data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </Text>
          {address.phone && (
            <Text className="flex items-center gap-x-2 !font-jxd-regular text-slate-500 text-sm" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              <Phone size={14} color="#64748b" />
              {address.phone}
            </Text>
          )}
        </div>
        <div className="flex items-center gap-x-3 pt-4">
          <button
            className="flex items-center gap-x-2 !font-jxd-medium text-slate-600 hover:text-[#FF000F] transition-colors duration-200 px-3 py-2 rounded-full hover:bg-red-50"
            style={{ fontFamily: 'JXD-Medium, sans-serif' }}
            onClick={open}
            data-testid="address-edit-button"
          >
            <Edit size={16} />
            Edit
          </button>
          <button
            className="flex items-center gap-x-2 !font-jxd-medium text-slate-600 hover:text-red-600 transition-colors duration-200 px-3 py-2 rounded-full hover:bg-red-50"
            style={{ fontFamily: 'JXD-Medium, sans-serif' }}
            onClick={removeAddress}
            data-testid="address-delete-button"
          >
            {removing ? <Spinner /> : <Trash size={16} />}
            Remove
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close} data-testid="edit-address-modal">
        <Modal.Title>
          <Heading className="mb-2 !font-jxd-bold" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>Edit Address</Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-4">
              <div className="grid grid-cols-2 gap-x-4">
                <div className="flex flex-col gap-y-2">
                  <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>First name</label>
                  <Input
                    label="First name"
                    name="first_name"
                    required
                    autoComplete="given-name"
                    defaultValue={address.first_name || undefined}
                    data-testid="first-name-input"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Last name</label>
                  <Input
                    label="Last name"
                    name="last_name"
                    required
                    autoComplete="family-name"
                    defaultValue={address.last_name || undefined}
                    data-testid="last-name-input"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Company</label>
                <Input
                  label="Company"
                  name="company"
                  autoComplete="organization"
                  defaultValue={address.company || undefined}
                  data-testid="company-input"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Address</label>
                <Input
                  label="Address"
                  name="address_1"
                  required
                  autoComplete="address-line1"
                  defaultValue={address.address_1 || undefined}
                  data-testid="address-1-input"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Apartment, suite, etc.</label>
                <Input
                  label="Apartment, suite, etc."
                  name="address_2"
                  autoComplete="address-line2"
                  defaultValue={address.address_2 || undefined}
                  data-testid="address-2-input"
                />
              </div>
              <div className="grid grid-cols-[144px_1fr] gap-x-4">
                <div className="flex flex-col gap-y-2">
                  <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Postal code</label>
                  <Input
                    label="Postal code"
                    name="postal_code"
                    required
                    autoComplete="postal-code"
                    defaultValue={address.postal_code || undefined}
                    data-testid="postal-code-input"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>City</label>
                  <Input
                    label="City"
                    name="city"
                    required
                    autoComplete="locality"
                    defaultValue={address.city || undefined}
                    data-testid="city-input"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Province / State</label>
                <Input
                  label="Province / State"
                  name="province"
                  autoComplete="address-level1"
                  defaultValue={address.province || undefined}
                  data-testid="state-input"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Country</label>
                <CountrySelect
                  name="country_code"
                  region={region}
                  required
                  autoComplete="country"
                  defaultValue={address.country_code || undefined}
                  data-testid="country-select"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Phone</label>
                <Input
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  defaultValue={address.phone || undefined}
                  data-testid="phone-input"
                />
              </div>
            </div>
            {formState.error && (
              <div className="text-red-600 !font-jxd-regular text-sm py-3 px-4 bg-red-50 rounded-lg mt-4" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-6">
              <Button
                type="reset"
                variant="secondary"
                onClick={close}
                className="h-10 !font-jxd-medium px-6 border-slate-300 text-slate-600 hover:border-slate-400 !rounded-full"
                style={{ fontFamily: 'JXD-Medium, sans-serif' }}
                data-testid="cancel-button"
              >
                Cancel
              </Button>
              <SubmitButton 
                data-testid="save-button"
                className="!font-jxd-medium px-6 !bg-[#FF000F] hover:!bg-[#E6000E] !rounded-full"
                style={{ fontFamily: 'JXD-Medium, sans-serif' }}
              >
                Save Changes
              </SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default EditAddress
