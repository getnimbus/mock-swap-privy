import { Suspense } from "react";
import { LoadingPage } from "@/components/ui/loading";
import PoolsContent from "@/components/pools-content";

export default function ChatPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <PoolsContent />
    </Suspense>
  );
}
