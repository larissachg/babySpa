import { getUsers } from '@/actions/users'
import { DataTable } from '@/components/layout/DataTable'
import { columns } from './(components)/Columns'

export default async function UsersPage() {
  const data = await getUsers()

  return <DataTable data={data} columns={columns} inputSearch='Nombre' />
}
