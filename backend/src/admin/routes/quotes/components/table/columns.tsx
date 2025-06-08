import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useB2BTranslation } from "../../../../hooks/use-b2b-translation";
import { DateCell } from "../../../../components/common/table/table-cells/date-cell";
import { TextCell } from "../../../../components/common/table/table-cells/text-cell";
import QuoteStatusBadge from "../quote-status-badge";

const columnHelper = createColumnHelper<any>();

export const useQuotesTableColumns = () => {
  const { t } = useB2BTranslation();

  return useMemo(
    () => [
      columnHelper.accessor("draft_order.display_id", {
        header: t("routes.quotes.table.id"),
        cell: ({ getValue }) => <TextCell text={`#${getValue()}`} />,
      }),
      columnHelper.accessor("status", {
        header: t("routes.quotes.table.status"),
        cell: ({ getValue }) => <QuoteStatusBadge status={getValue()} />,
      }),
      columnHelper.accessor("customer.email", {
        header: t("routes.quotes.table.customer"),
        cell: ({ getValue }) => <TextCell text={getValue()} />,
      }),
      columnHelper.accessor("draft_order.customer.employee.company.name", {
        header: t("routes.quotes.table.company"),
        cell: ({ getValue }) => <TextCell text={getValue()} />,
      }),
      columnHelper.accessor("draft_order.total", {
        header: t("routes.quotes.table.amount"),
        cell: ({ getValue, row }) => {
          <TextCell
            text={`${row.original.draft_order.currency_code.toUpperCase()} ${getValue()}`}
          />;
        },
      }),

      columnHelper.accessor("created_at", {
        header: t("routes.quotes.table.createdAt"),
        cell: ({ getValue }) => <DateCell date={getValue()} />,
      }),
    ],
    [t]
  );
};
