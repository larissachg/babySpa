import { getUsers } from '@/actions/users'
import { UsersTable } from './(components)/Users'

export default async function UsersPage() {
  const data = await getUsers()
  return <UsersTable data={data} />
}
