import TransactionDetail from "@/features/client/my-transactions/detail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <TransactionDetail id={id} />;
}
