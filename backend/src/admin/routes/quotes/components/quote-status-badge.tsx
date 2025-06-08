import { StatusBadge } from "@medusajs/ui";
import { useB2BTranslation } from "../../../hooks/use-b2b-translation";

const StatusColors: Record<string, "green" | "orange" | "red" | "blue"> = {
  accepted: "green",
  customer_rejected: "orange",
  merchant_rejected: "red",
  pending_merchant: "blue",
  pending_customer: "blue",
};

export default function QuoteStatusBadge({ status }: { status: string }) {
  const { t } = useB2BTranslation();

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepted":
        return t("routes.quotes.status.accepted");
      case "customer_rejected":
        return t("routes.quotes.status.customer_rejected");
      case "merchant_rejected":
        return t("routes.quotes.status.merchant_rejected");
      case "pending_merchant":
        return t("routes.quotes.status.pending_merchant");
      case "pending_customer":
        return t("routes.quotes.status.pending_customer");
      default:
        return status;
    }
  };

  return (
    <StatusBadge color={StatusColors[status]}>
      {getStatusText(status)}
    </StatusBadge>
  );
}
