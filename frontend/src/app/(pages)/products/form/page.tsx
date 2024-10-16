import { getProductById } from '@/actions/products';
import FormProductForm from './(components)/FormProductPage';
import { redirect } from 'next/navigation'


export default async function FormPage({
  searchParams
}: {
  searchParams: { id: string; type: 'view' | 'update' }
}) {
  if (!searchParams.id) {
    return <FormProductForm />
  }

  if (searchParams.type !== 'view' && searchParams.type !== 'update')
    redirect('/products')

  const product = await getProductById(searchParams.id)

  if (!product) redirect('/products')

  return <FormProductForm data={product} type={searchParams.type} />
}
