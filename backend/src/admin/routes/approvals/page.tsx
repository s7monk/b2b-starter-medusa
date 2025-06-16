import { defineRouteConfig } from "@medusajs/admin-sdk";
import { CheckCircle } from "@medusajs/icons";
import { Container, Heading, Toaster } from "@medusajs/ui";
import { useB2BTranslation, usePageTitleTranslation } from "../../hooks/use-b2b-translation";
import { useMenuLabelUpdater } from "../../lib/menu-label-updater";
import { ApprovalsTable } from "./components/approvals-table";
import "../../lib/init-i18n";

const Approvals = () => {
  const { t } = useB2BTranslation();
  const { t: tTitle } = usePageTitleTranslation(); // 专门用于页面标题，避免显示翻译键
  useMenuLabelUpdater(); // 启用菜单标签更新

  // 使用专门的页面标题翻译hook，在任何语言下都不会显示翻译键
  const pageTitle = tTitle("routes.approvals.title");

  return (
    <>
      <Container className="flex flex-col p-0 overflow-hidden">
        <Heading className="p-6 pb-0 font-sans font-medium h1-core">
          {pageTitle}
        </Heading>
        <ApprovalsTable />
      </Container>
      <Toaster />
    </>
  );
};

export default Approvals;

export const config = defineRouteConfig({
  label: "Approvals",
  icon: CheckCircle,
});

