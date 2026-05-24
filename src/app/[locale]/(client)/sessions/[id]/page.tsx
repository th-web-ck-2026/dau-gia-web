import React from "react";

import SessionDetailFeature from "@/features/sessions/detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SessionDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <SessionDetailFeature id={id} />;
}
