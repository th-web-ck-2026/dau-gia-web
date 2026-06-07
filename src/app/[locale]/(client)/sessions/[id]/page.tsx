import SessionDetail from "@/features/client/sessions/detail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <SessionDetail id={id} />;
}
