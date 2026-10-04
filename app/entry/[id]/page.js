import { redirect } from "next/navigation";

export default async function SingleEntryPage({ params }) {
  const { id } = await params;
  redirect(`/?entry=${id}`);
}
