import { Prompt } from "@medusajs/ui";
import { PropsWithChildren } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useBlocker } from "react-router-dom";
import { Form } from "../../form";
import { useB2BTranslation } from "../../../../hooks/use-b2b-translation";

type RouteModalFormProps<TFieldValues extends FieldValues> = PropsWithChildren<{
  form: UseFormReturn<TFieldValues>;
  blockSearch?: boolean;
  onClose?: (isSubmitSuccessful: boolean) => void;
}>;

export const RouteModalForm = <TFieldValues extends FieldValues = any>({
  form,
  blockSearch = false,
  children,
  onClose,
}: RouteModalFormProps<TFieldValues>) => {
  const { t } = useB2BTranslation();
  const {
    formState: { isDirty },
  } = form;

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const { isSubmitSuccessful } = nextLocation.state || {};

    if (isSubmitSuccessful) {
      onClose?.(true);
      return false;
    }

    const isPathChanged = currentLocation.pathname !== nextLocation.pathname;
    const isSearchChanged = currentLocation.search !== nextLocation.search;

    if (blockSearch) {
      const ret = isDirty && (isPathChanged || isSearchChanged);

      if (!ret) {
        onClose?.(isSubmitSuccessful);
      }

      return ret;
    }

    const ret = isDirty && isPathChanged;

    if (!ret) {
      onClose?.(isSubmitSuccessful);
    }

    return ret;
  });

  const handleCancel = () => {
    blocker?.reset?.();
  };

  const handleContinue = () => {
    blocker?.proceed?.();
    onClose?.(false);
  };

  return (
    <Form {...form}>
      {children}
      <Prompt open={blocker.state === "blocked"} variant="confirmation">
        <Prompt.Content>
          <Prompt.Header>
            <Prompt.Title>
              {t("common.confirmLeaveForm")}
            </Prompt.Title>

            <Prompt.Description>
              {t("common.confirmLeaveFormDesc")}
            </Prompt.Description>
          </Prompt.Header>

          <Prompt.Footer>
            <Prompt.Cancel onClick={handleCancel} type="button">
              {t("common.cancel")}
            </Prompt.Cancel>
            <Prompt.Action onClick={handleContinue} type="button">
              {t("common.continue")}
            </Prompt.Action>
          </Prompt.Footer>
        </Prompt.Content>
      </Prompt>
    </Form>
  );
};
