"use client"

import { retrieveCustomer } from "@/lib/data/customer"
import { listCartFreeShippingPrices } from "@/lib/data/fulfillment"
import CartDrawer from "@/modules/cart/components/cart-drawer"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"
import { useCart } from "@/lib/context/cart-context"
import { useEffect, useState } from "react"
import { B2BCustomer } from "@/types"

export default function CartButton() {
  const { cart } = useCart()
  const [customer, setCustomer] = useState<B2BCustomer | null>(null)
  const [freeShippingPrices, setFreeShippingPrices] = useState<StoreFreeShippingPrice[]>([])

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await retrieveCustomer()
        setCustomer(customerData)
      } catch {
        setCustomer(null)
      }
    }
    
    fetchCustomer()
  }, [])

  useEffect(() => {
    const fetchFreeShippingPrices = async () => {
      if (cart?.id) {
        try {
          const prices = await listCartFreeShippingPrices(cart.id)
          setFreeShippingPrices(prices)
        } catch {
          setFreeShippingPrices([])
        }
      }
    }
    
    fetchFreeShippingPrices()
  }, [cart?.id])

  return (
    <CartDrawer customer={customer} freeShippingPrices={freeShippingPrices} />
  )
}
