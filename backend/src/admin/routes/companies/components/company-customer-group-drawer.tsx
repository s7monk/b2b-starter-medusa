import { HttpTypes } from "@medusajs/types";
import { Button, Drawer, Hint, Table, toast } from "@medusajs/ui";
import { QueryCompany } from "../../../../types";
import {
  useAddCompanyToCustomerGroup,
  useRemoveCompanyFromCustomerGroup,
} from "../../../hooks/api";
import { useB2BTranslation } from "../../../hooks/use-b2b-translation";

export function CompanyCustomerGroupDrawer({
  company,
  customerGroups,
  open,
  setOpen,
}: {
  company: QueryCompany;
  customerGroups?: HttpTypes.AdminCustomerGroup[];
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { t } = useB2BTranslation();
  const { mutateAsync: addMutate, isPending: addLoading } =
    useAddCompanyToCustomerGroup(company.id);

  const { mutateAsync: removeMutate, isPending: removeLoading } =
    useRemoveCompanyFromCustomerGroup(company.id);

  const handleAdd = async (groupId: string) => {
    await addMutate(groupId, {
      onSuccess: async () => {
        setOpen(false);
        toast.success(t("routes.companies.toasts.addToGroupSuccess"));
      },
      onError: (error) => {
        toast.error(t("routes.companies.toasts.addToGroupError"));
      },
    });
  };

  const handleRemove = async (groupId: string) => {
    await removeMutate(groupId, {
      onSuccess: async () => {
        toast.success(t("routes.companies.toasts.removeFromGroupSuccess"));
      },
      onError: (error) => {
        console.log(error);
        toast.error(t("routes.companies.toasts.removeFromGroupError"));
      },
    });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Content className="z-50">
        <Drawer.Header>
          <Drawer.Title>{t("routes.companies.customerGroup.title")}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="space-y-4 h-full overflow-y-hidden">
          <Hint variant="info">
            {t("routes.companies.customerGroup.hint", { 
              companyName: company.name, 
              employeeCount: company.employees?.length || 0 
            })}
          </Hint>
          <div className="h-full overflow-y-auto">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>{t("routes.companies.customerGroup.customerGroupColumn")}</Table.HeaderCell>
                  <Table.HeaderCell className="text-right">
                    {t("routes.companies.customerGroup.actionsColumn")}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {customerGroups ? (
                  customerGroups.map((group) => (
                    <Table.Row key={group.id}>
                      <Table.Cell>{group.name}</Table.Cell>
                      <Table.Cell className="text-right">
                        {company.customer_group?.id &&
                        company.customer_group.id === group.id ? (
                          <Button
                            onClick={() => handleRemove(group.id)}
                            isLoading={removeLoading}
                            variant="danger"
                          >
                            {t("routes.companies.customerGroup.removeButton")}
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleAdd(group.id)}
                            disabled={
                              (company.customer_group?.id &&
                                company.customer_group.id !== group.id) ||
                              addLoading
                            }
                            isLoading={addLoading}
                          >
                            {t("routes.companies.customerGroup.addButton")}
                          </Button>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell>{t("routes.companies.customerGroup.noGroupsFound")}</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  );
}
