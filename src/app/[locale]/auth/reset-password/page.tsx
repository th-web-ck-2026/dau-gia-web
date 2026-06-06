import { notFound } from "next/navigation";

import ResetPassword from "@/features/auth/reset-password";

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

const ResetPasswordPage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  if (!params.token) {
    notFound();
  }
  return <ResetPassword token={params.token} />;
};

export default ResetPasswordPage;
