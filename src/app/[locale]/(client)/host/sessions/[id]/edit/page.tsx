import React from "react";

import { HostEditSessionFeature } from "@/features/host/create-edit";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HostEditSessionPage({ params }: PageProps) {
  const { id } = await params;
  return <HostEditSessionFeature id={id} />;
}
