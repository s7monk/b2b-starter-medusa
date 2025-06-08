import { defineRouteConfig } from "@medusajs/admin-sdk";
import { DocumentText } from "@medusajs/icons";
import { Container, Heading, Toaster } from "@medusajs/ui";
import { useB2BTranslation } from "../../hooks/use-b2b-translation";
import { useMenuLabelUpdater } from "../../lib/menu-label-updater";
import { QuotesTable } from "./components/quotes-table";
import "../../lib/init-i18n";

const Quotes = () => {
  const { t } = useB2BTranslation();
  useMenuLabelUpdater(); // 启用菜单标签更新

  return (
    <>
      <Container className="flex flex-col p-0 overflow-hidden">
        <Heading className="p-6 pb-0 font-sans font-medium h1-core">
          {t("routes.quotes.title")}
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
