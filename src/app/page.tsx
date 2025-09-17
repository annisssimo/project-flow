"use client";

import { useApp } from "@/components/providers";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function Home() {
  const { isInitialized } = useApp();

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return <Dashboard />;
}