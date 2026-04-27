import { useEffect, useState } from "react";

interface UseDashboardDataOptions<T> {
  url: string;
  initialData: T;
}

export function useDashboardData<T>({ url, initialData }: UseDashboardDataOptions<T>) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? "Error cargando datos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}
