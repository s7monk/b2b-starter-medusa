import { defineRouteConfig } from "@medusajs/admin-sdk";
import { DocumentText } from "@medusajs/icons";
import { Container, Heading, Toaster } from "@medusajs/ui";
import { useB2BTranslation } from "../../hooks/use-b2b-translation";
import { useMenuLabelUpdater } from "../../lib/menu-label-updater";
import { QuotesTable } from "./components/quotes-table";
import "../../lib/init-i18n";

const Quotes = () => {
  const { t, isReady } = useB2BTranslation();
  useMenuLabelUpdater(); // 启用菜单标签更新

  // 如果翻译还没准备好，显示加载状态或回退文本
  const pageTitle = isReady ? t("routes.quotes.title") : "Quotes";

  return (
    <>
      <Container className="flex flex-col p-0 overflow-hidden">
        <Heading className="p-6 pb-0 font-sans font-medium h1-core">
          {pageTitle}
        </Heading>

        <QuotesTable />
      </Container>
      <Toaster />
    </>
  );
};

export const config = defineRouteConfig({
  label: "Quotes",
  icon: DocumentText,
});

export default Quotes;
