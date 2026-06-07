"use client"

import { SubscriptionGuard } from "@/components/SubscriptionGuard"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SubscriptionGuard>{children}</SubscriptionGuard>
}
