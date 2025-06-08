import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useB2BTranslation } from "../../../../hooks/use-b2b-translation";
import { TextCell } from "../../../../components/common/table/table-cells/text-cell";
import { StatusBadge } from "@medusajs/ui";
import { ApprovalStatusType } from "../../../../../types/approval";
import ItemsPopover from "../approvals-items-popover";
import { DateCell } from "../../../../../admin/components/common/table/table-cells/date-cell";
import { ApprovalActions } from "../approval-actions";

const columnHelper = createColumnHelper<any>();

export const useApprovalsTableColumns = () => {
  const { t } = useB2BTranslation();

  return useMemo(
    () => [
      columnHelper.accessor("id", {
        header: t("routes.approvals.table.orderId"),
        cell: ({ getValue }) => <TextCell text={`#${getValue().slice(-4)}`} />,
      }),
      columnHelper.accessor("updated_at", {
        header: t("routes.approvals.table.requestedAt"),
        cell: ({ getValue }) => <DateCell date={getValue()} />,
      }),
      columnHelper.accessor("company.name", {
        header: t("routes.approvals.table.company"),
        cell: ({ getValue }) => <TextCell text={getValue()} />,
      }),
      columnHelper.accessor("approval_status.status", {
        header: t("routes.approvals.table.status"),
        cell: ({ getValue }) => {
          const status = getValue();
          const getStatusText = (status: string) => {
            switch (status) {
              case ApprovalStatusType.APPROVED:
                return t("routes.approvals.status.approved");
              case ApprovalStatusType.REJECTED:
                return t("routes.approvals.status.rejected");
              default:
                return t("routes.approvals.status.pending");
            }
          };
          return (
            <StatusBadge
              color={
                status === ApprovalStatusType.APPROVED
                  ? "green"
                  : status === ApprovalStatusType.REJECTED
                  ? "red"
                  : "purple"
              }
            >
              {getStatusText(status)}
            </StatusBadge>
          );
        },
      }),
      columnHelper.accessor("items", {
        header: t("fields.items"),
        cell: ({ getValue, row }) => (
          <ItemsPopover
            items={getValue()}
            currencyCode={row.original.currency_code}
          />
        ),
      }),
      columnHelper.accessor("actions", {
        header: t("routes.approvals.table.actions"),
        cell: ({ row }) => <ApprovalActions cart={row.original} />,
      }),
    ],
    [t]
  );
};
