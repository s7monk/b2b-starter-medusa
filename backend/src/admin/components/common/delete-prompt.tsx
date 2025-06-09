import { Trash } from "@medusajs/icons";
import { Button, Prompt } from "@medusajs/ui";
import { useB2BTranslation } from "../../hooks/use-b2b-translation";

interface DeletePromptProps {
  handleDelete: () => void;
  loading: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DeletePrompt = ({
  handleDelete,
  loading,
  open,
  setOpen,
}: DeletePromptProps) => {
  const { t } = useB2BTranslation();
  
  const handleConfirmDelete = async () => {
    handleDelete();
    setOpen(false);
  };

  return (
    <Prompt open={open} onOpenChange={setOpen}>
      <Prompt.Content className="p-4 pb-0 border-b shadow-ui-fg-shadow">
        <Prompt.Title>{t("common.confirmDeletion")}</Prompt.Title>
        <Prompt.Description>
          {t("common.confirmDeletionDesc")}
        </Prompt.Description>
        <Prompt.Footer>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            isLoading={loading}
          >
            <Trash />
            {t("common.delete")}
          </Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            {t("common.cancel")}
          </Button>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};
