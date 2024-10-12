import { DataTable } from "@/components/layout/DataTable";
import { getProducts } from "@/actions/products";
import { columns } from "./(components)/Columns";

export default async function ProductsPage() {
  const data = await getProducts();

  return <DataTable data={data} columns={columns} inputSearch="Nombre" />;
}
