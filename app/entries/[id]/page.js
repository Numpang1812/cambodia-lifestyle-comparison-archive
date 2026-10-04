import { redirect } from "next/navigation";

export default async function EntryRoutePage({ params }) {
  const { id } = await params;
  redirect(`/?entry=${id}`);
}
