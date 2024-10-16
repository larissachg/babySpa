import { getClientById } from "@/actions/clients";
import FormClientPage from "./(components)/FormClientPage";
import { redirect } from "next/navigation";

export default async function FormPage({
  searchParams,
}: {
  searchParams: { id: string; type: "view" | "update" };
}) {
  if (!searchParams.id) {
    return <FormClientPage />;
  }

  if (searchParams.type !== "view" && searchParams.type !== "update")
    redirect("/clients");

  const client = await getClientById(searchParams.id);

  if (!client) redirect("/clients");

  return <FormClientPage data={client} type={searchParams.type} />;
}
