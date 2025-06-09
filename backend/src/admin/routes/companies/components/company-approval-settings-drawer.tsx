import { Button, Drawer, toast } from "@medusajs/ui";
import { useState } from "react";
import { QueryCompany } from "../../../../types";
import { CoolSwitch } from "../../../components/common";
import { useUpdateApprovalSettings } from "../../../hooks/api";
import { useB2BTranslation } from "../../../hooks/use-b2b-translation";

export function CompanyApprovalSettingsDrawer({
  company,
  open,
  setOpen,
}: {
  company: QueryCompany;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { t } = useB2BTranslation();
  const [requiresAdminApproval, setRequiresAdminApproval] = useState(
    company.approval_settings?.requires_admin_approval || false
  );
  const [requiresSalesManagerApproval, setRequiresSalesManagerApproval] =
    useState(
      company.approval_settings?.requires_sales_manager_approval || false
    );

  const { mutateAsync, isPending } = useUpdateApprovalSettings(company.id);

  const { approval_settings } = company;

  const handleSubmit = async () => {
    await mutateAsync(
      {
        id: approval_settings.id,
        requires_admin_approval: requiresAdminApproval,
        requires_sales_manager_approval: requiresSalesManagerApproval,
      },
      {
        onSuccess: async () => {
          setOpen(false);
          toast.success(t("routes.companies.approvalSettings.updateSuccess"));
        },
        onError: (error) => {
          toast.error(t("routes.companies.approvalSettings.updateError"));
        },
      }
    );
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Content className="z-50">
        <Drawer.Header>
          <Drawer.Title>{t("routes.companies.approvalSettings.title")}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CoolSwitch
              checked={requiresAdminApproval}
              onChange={() => setRequiresAdminApproval(!requiresAdminApproval)}
              fieldName="requires_admin_approval"
              label={t("routes.companies.approvalSettings.requiresAdminApproval")}
              description={t("routes.companies.approvalSettings.requiresAdminApprovalDesc")}
            />
          </div>

          <div className="flex items-center gap-2">
            <CoolSwitch
              checked={requiresSalesManagerApproval}
              onChange={() =>
                setRequiresSalesManagerApproval(!requiresSalesManagerApproval)
              }
              fieldName="requires_sales_manager_approval"
              label={t("routes.companies.approvalSettings.requiresSalesManagerApproval")}
              description={t("routes.companies.approvalSettings.requiresSalesManagerApprovalDesc")}
            />
          </div>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSubmit} isLoading={isPending}>
            {t("common.save")}
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}
