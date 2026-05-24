import React from "react";

import HostRankingFeature from "@/features/host/ranking";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HostRankingPage({ params }: PageProps) {
  const { id } = await params;
  return <HostRankingFeature id={id} />;
}
