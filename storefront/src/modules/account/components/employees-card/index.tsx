import { retrieveCustomer } from "@/lib/data/customer"
import EmployeeWrapper from "@/modules/account/components/employees-card/employee-wrapper"
import { QueryCompany } from "@/types"
import { Container, Text } from "@medusajs/ui"

const EmployeesCard = async ({ company }: { company: QueryCompany }) => {
  const { employees } = company
  const customer = await retrieveCustomer()

  return (
    <Container className="p-0 overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex flex-col">
        {employees && employees.length > 0 ? (
          employees
            .sort((a) => (a.customer.email === customer?.email ? -1 : 1))
            .map((employee) => (
              <EmployeeWrapper
                key={employee.id}
                employee={employee}
                company={company}
              />
            ))
        ) : (
          <div className="p-8 text-center">
            <Text className="!font-jxd-regular text-slate-500" style={{ fontFamily: 'JXD-Regular, sans-serif' }}>
              No employees found
            </Text>
          </div>
        )}
      </div>
    </Container>
  )
}

export default EmployeesCard
