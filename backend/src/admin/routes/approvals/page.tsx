import { defineRouteConfig } from "@medusajs/admin-sdk";
import { CheckCircle } from "@medusajs/icons";
import { Container, Heading, Toaster } from "@medusajs/ui";
import { useB2BTranslation } from "../../hooks/use-b2b-translation";
import { useMenuLabelUpdater } from "../../lib/menu-label-updater";
import { ApprovalsTable } from "./components/approvals-table";
import "../../lib/init-i18n";

const Approvals = () => {
  const { t } = useB2BTranslation();
  useMenuLabelUpdater(); // 启用菜单标签更新

  return (
    <>
      <Container className="flex flex-col p-0 overflow-hidden">
        <Heading className="p-6 pb-0 font-sans font-medium h1-core">
          {t("routes.approvals.title")}
        </Heading>
        <ApprovalsTable />
      </Container>
      <Toaster />
    </>
  );
};

export const config = defineRouteConfig({
  label: "Approvals",
  icon: CheckCircle,
});

export default Approvals;
