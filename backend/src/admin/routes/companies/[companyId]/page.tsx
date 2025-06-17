import { ExclamationCircle } from "@medusajs/icons";
import {
  Avatar,
  Badge,
  Container,
  Heading,
  Table,
  Text,
  Toaster,
} from "@medusajs/ui";
import { QueryEmployee } from "../../../../types";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminCustomerGroups, useCompany } from "../../../hooks/api";
import { useB2BTranslation } from "../../../hooks/use-b2b-translation";
import { formatAmount } from "../../../utils";
import { useMenuLabelUpdater } from "../../../lib/menu-label-updater";
import { CompanyActionsMenu } from "../components";
import {
  EmployeeCreateDrawer,
  EmployeesActionsMenu,
} from "../components/employees";
import "../../../lib/init-i18n";

const CompanyDetails = () => {
  const { t } = useB2BTranslation();
  useMenuLabelUpdater(); // 启用菜单标签更新
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { data, isPending, isError } = useCompany(companyId!, {
    fields:
      "*employees,*employees.customer,*employees.company,*customer_group,*approval_settings",
  });

  const { data: customerGroups } = useAdminCustomerGroups();

  const company = data?.company;

  // 显示加载状态
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <Text>{t("common.loading")}</Text>
      </div>
    );
  }

  // 只有在不是加载状态且确实没有找到公司时才显示错误
  if (!isPending && (!company || isError)) {
    return (
      <div className="flex items-center justify-center h-64">
        <Text>{t("routes.companies.companyDetails.notFound")}</Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Container className="flex flex-col p-0 overflow-hidden">
        {!isPending && (
          <>
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 justify-between">
              <div className="flex items-center gap-2">
                <Avatar
                  src={company?.logo_url || undefined}
                  fallback={company?.name?.charAt(0)}
                />
                <Heading className="font-sans font-medium h1-core">
                  {company?.name}
                </Heading>
              </div>
              <CompanyActionsMenu
                company={company}
                customerGroups={customerGroups}
              />
            </div>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell className="font-medium font-sans txt-compact-small max-w-fit">
                    {t("routes.companies.companyDetails.phone")}
                  </Table.Cell>
                  <Table.Cell>{company?.phone}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-medium font-sans txt-compact-small">
                    {t("routes.companies.companyDetails.email")}
                  </Table.Cell>
                  <Table.Cell>{company?.email}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-medium font-sans txt-compact-small">
                    {t("routes.companies.companyDetails.address")}
                  </Table.Cell>
                  <Table.Cell>{company?.address}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-medium font-sans txt-compact-small">
                    {t("routes.companies.companyDetails.city")}
                  </Table.Cell>
                  <Table.Cell>{company?.city}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-medium font-sans txt-compact-small">
                    {t("routes.companies.companyDetails.state")}
                  </Table.Cell>
                  <Table.Cell>{company?.state}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-medium font-sans txt-compact-small">
                    {t("routes.companies.companyDetails.currency")}
                  </Table.Cell>
                  <Table.Cell>
                    {company?.currency_code?.toUpperCase()}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-medium font-sans txt-compact-small">
                    {t("routes.companies.companyDetails.customerGroup")}
                  </Table.Cell>
                  <Table.Cell>
                    {company?.customer_group ? (
                      <Badge size="small" color="blue">
                        {company?.customer_group?.name}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-medium font-sans txt-compact-small">
                    {t("routes.companies.companyDetails.approvalSettings")}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      {company?.approval_settings?.requires_admin_approval && (
                        <Badge size="small" color="purple">
                          {t("routes.companies.companyDetails.requiresAdminApproval")}
                        </Badge>
                      )}
                      {company?.approval_settings
                        ?.requires_sales_manager_approval && (
                        <Badge size="small" color="purple">
                          {t("routes.companies.companyDetails.requiresSalesManagerApproval")}
                        </Badge>
                      )}
                      {!company?.approval_settings?.requires_admin_approval &&
                        !company?.approval_settings
                          ?.requires_sales_manager_approval && (
                          <Badge size="small" color="grey">
                            {t("routes.companies.companyDetails.noApprovalRequired")}
                          </Badge>
                        )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </>
        )}
      </Container>
      <Container className="flex flex-col p-0 overflow-hidden">
        {!isPending && (
          <>
            <div className="flex items-center gap-2 px-6 py-4 justify-between border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Heading className="font-sans font-medium h1-core">
                  {t("routes.companies.companyDetails.employees")}
                </Heading>
              </div>
              <EmployeeCreateDrawer company={company} />
            </div>
            {company?.employees && company?.employees.length > 0 ? (
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>{t("routes.companies.companyDetails.name")}</Table.HeaderCell>
                    <Table.HeaderCell>{t("routes.companies.companyDetails.email")}</Table.HeaderCell>
                    <Table.HeaderCell>{t("routes.companies.companyDetails.spendingLimit")}</Table.HeaderCell>
                    <Table.HeaderCell>{t("routes.companies.companyDetails.actions")}</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {company?.employees.map((employee: QueryEmployee) => (
                    <Table.Row
                      key={employee.id}
                      onClick={() => {
                        navigate(`/customers/${employee!.customer!.id}`);
                      }}
                      className="cursor-pointer"
                    >
                      <Table.Cell className="w-6 h-6 items-center justify-center">
                        <Avatar
                          fallback={
                            employee.customer?.first_name?.charAt(0) || ""
                          }
                        />
                      </Table.Cell>
                      <Table.Cell className="flex w-fit gap-2 items-center">
                        {employee.customer?.first_name}{" "}
                        {employee.customer?.last_name}
                        {employee.is_admin && (
                          <Badge
                            size="2xsmall"
                            color={employee.is_admin ? "green" : "grey"}
                          >
                            {t("routes.companies.companyDetails.admin")}
                          </Badge>
                        )}
                      </Table.Cell>
                      <Table.Cell>{employee.customer?.email}</Table.Cell>
                      <Table.Cell>
                        {formatAmount(
                          employee.spending_limit,
                          company?.currency_code || "USD"
                        )}
                      </Table.Cell>
                      <Table.Cell onClick={(e) => e.stopPropagation()}>
                        <EmployeesActionsMenu
                          company={company}
                          employee={employee}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <div className="flex h-[400px] w-full flex-col items-center justify-center gap-y-4">
                <div className="flex flex-col items-center gap-y-3">
                  <ExclamationCircle />
                  <div className="flex flex-col items-center gap-y-1">
                    <Text className="font-medium font-sans txt-compact-small">
                      {t("routes.companies.companyDetails.noEmployees")}
                    </Text>
                    <Text className="txt-small text-ui-fg-muted">
                      {t("routes.companies.companyDetails.noEmployeesDesc")}
                    </Text>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </Container>
      <Toaster />
    </div>
  );
};

export default CompanyDetails;
