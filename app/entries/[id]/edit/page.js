import { redirect } from "next/navigation";

export default async function EntryEditRoutePage({ params }) {
  const { id } = await params;
  redirect(`/contribute?edit=${id}`);
}
