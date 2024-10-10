import { ProductsTable } from "./(components)/Products";
import { getProducts } from "@/actions/products";

export default async function ProductsPage() {
  const data = await getProducts();
  
  return <ProductsTable data={data} />;
}
