import { getSales } from '@/actions/sales'
import { DataTable } from '@/components/layout/DataTable'
import { columns } from './(components)/Columns'

export default async function SalesPage() {
  const data = await getSales()

  return <DataTable data={data} columns={columns} inputSearch='IdCliente' />
}
