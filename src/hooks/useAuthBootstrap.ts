import { useEffect, useState } from "react";
import { ensureAnonymousAuth } from "@/lib/apiClient";

export function useAuthBootstrap() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await ensureAnonymousAuth();
        if (!cancelled) setReady(true);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to authenticate");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { ready, error };
}

