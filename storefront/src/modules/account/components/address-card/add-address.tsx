"use client"

import { addCustomerAddress } from "@/lib/data/customer"
import useToggleState from "@/lib/hooks/use-toggle-state"
import CountrySelect from "@/modules/checkout/components/country-select"
import { SubmitButton } from "@/modules/checkout/components/submit-button"
import Button from "@/modules/common/components/button"
import Input from "@/modules/common/components/input"
import Modal from "@/modules/common/components/modal"
import { Plus } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"
import { useActionState, useEffect, useState } from "react"

const AddAddress = ({ region }: { region: HttpTypes.StoreRegion }) => {
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
    success: false,
    error: null,
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

  return (
    <>
      <button
        className="border-2 border-dashed border-slate-300 hover:border-[#FF000F] rounded-2xl p-6 min-h-[240px] h-full w-full flex flex-col items-center justify-center gap-y-4 transition-colors duration-200 bg-white hover:bg-red-50"
        onClick={open}
        data-testid="add-address-button"
      >
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
          <Plus className="text-slate-600" />
        </div>
        <span className="!font-jxd-medium text-slate-700" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Add New Address</span>
        <span className="!font-jxd-regular text-slate-500 text-sm text-center" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
          Create a new shipping address for faster checkout
        </span>
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <Heading className="mb-2 !font-jxd-bold" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>Add New Address</Heading>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-4">
              <div className="grid grid-cols-2 gap-x-4">
                <div className="flex flex-col gap-y-2">
                  <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>First name</label>
                  <Input
                    label="First name"
                    name="first_name"
                    required
                    autoComplete="given-name"
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
                  data-testid="address-1-input"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Apartment, suite, etc.</label>
                <Input
                  label="Apartment, suite, etc."
                  name="address_2"
                  autoComplete="address-line2"
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
                  data-testid="state-input"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Country</label>
                <CountrySelect
                  region={region}
                  name="country_code"
                  required
                  autoComplete="country"
                  data-testid="country-select"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label className="!font-jxd-medium text-slate-900 text-sm" style={{ fontFamily: 'JXD-Medium, sans-serif' }}>Phone</label>
                <Input
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  data-testid="phone-input"
                />
              </div>
            </div>
            {formState.error && (
              <div
                className="text-red-600 !font-jxd-regular text-sm py-3 px-4 bg-red-50 rounded-lg mt-4"
                style={{ fontFamily: 'JXD-Regular, sans-serif' }}
                data-testid="address-error"
              >
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
                Save Address
              </SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress
