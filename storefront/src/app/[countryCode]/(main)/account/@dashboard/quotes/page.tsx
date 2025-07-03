import { fetchQuotes } from "@/lib/data/quotes"
import { Heading } from "@medusajs/ui"
import QuotesOverview from "./components/quotes-overview"

export default async function Quotes() {
  const { quotes } = await fetchQuotes()

  return (
    <div className="w-full space-y-6" data-testid="quotes-page-wrapper">
      <div className="flex items-center gap-x-3">
        <div className="w-1 h-6 bg-gradient-to-b from-[#FF000F] to-[#CC0000] rounded-full"></div>
        <Heading className="!font-jxd-bold text-xl text-slate-900" style={{ fontFamily: 'JXD-Bold, sans-serif' }}>Quotes</Heading>
      </div>

      <div>
        <QuotesOverview quotes={quotes!} />
      </div>
    </div>
  )
}
