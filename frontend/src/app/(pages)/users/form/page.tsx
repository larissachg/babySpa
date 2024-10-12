import { getUserById } from '@/actions/users'
import FormUserPage from './(components)/FormUserPage'
import { redirect } from 'next/navigation'

export default async function FormPage({
  searchParams
}: {
  searchParams: { id: string; type: 'view' | 'update' }
}) {
  if (!searchParams.id) {
    return <FormUserPage />
  }

  if (searchParams.type !== 'view' && searchParams.type !== 'update')
    redirect('/users')

  const user = await getUserById(searchParams.id)

  if (!user) redirect('/users')

  return <FormUserPage data={user} type={searchParams.type} />
}
