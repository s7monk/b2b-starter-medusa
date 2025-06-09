import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
  const { actor_id: customer_id } = req.auth_context;

  const {
    data: [customer],
  } = await query.graph(
    {
      entity: "customer",
      fields: [
        "id",
        "email", 
        "first_name", 
        "last_name", 
        "phone",
        "has_account",
        "addresses.*",
        "employee.id",
        "employee.spending_limit",
        "employee.is_admin", 
        "employee.company.id",
        "employee.company.name",
        "employee.company.currency_code",
      ],
      filters: { id: customer_id },
    },
    { throwIfKeyNotFound: true }
  );

  res.json({ customer });
}; 