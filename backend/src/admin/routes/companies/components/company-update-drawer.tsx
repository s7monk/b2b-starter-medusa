import { Drawer, toast } from "@medusajs/ui";
import { AdminUpdateCompany, QueryCompany } from "../../../../types";
import { useUpdateCompany } from "../../../hooks/api";
import { useB2BTranslation } from "../../../hooks/use-b2b-translation";
import { CompanyForm } from "./company-form";

export function CompanyUpdateDrawer({
  company,
  open,
  setOpen,
}: {
  company: QueryCompany;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { t } = useB2BTranslation();
  const { mutateAsync, isPending, error } = useUpdateCompany(company.id);

  const {
    created_at,
    updated_at,
    id,
    employees,
    customer_group,
    approval_settings,
    ...currentData
  } = company;

  const handleSubmit = async (formData: AdminUpdateCompany) => {
    await mutateAsync(formData, {
      onSuccess: async () => {
        setOpen(false);
        toast.success(t("routes.companies.toasts.updateSuccess"));
      },
      onError: (error) => {
        toast.error(t("routes.companies.toasts.updateError"));
      },
    });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Content className="z-50">
        <Drawer.Header>
          <Drawer.Title>{t("routes.companies.actions.edit")}</Drawer.Title>
        </Drawer.Header>

        <CompanyForm
          handleSubmit={handleSubmit}
          loading={isPending}
          error={error}
          company={currentData}
        />
      </Drawer.Content>
    </Drawer>
  );
}
