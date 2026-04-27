import { useEffect, useState } from "react";
import api from "@/api/api";

// ===============================
// Tipo de respuesta del backend
// ===============================
export interface CodigoPostalResponse {
  colonias: string[];
  ciudad: string;
  estado: string;
  municipio: string;
}

// ===============================
// Hook principal
// ===============================
export function useCodigoPostal(cp: string) {
  const [data, setData] = useState<CodigoPostalResponse>({
    colonias: [],
    ciudad: "",
    estado: "",
    municipio: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!cp || cp.length !== 5) {
      setData({
        colonias: [],
        ciudad: "",
        estado: "",
        municipio: "",
      });
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    api
      .get<CodigoPostalResponse>(`/codigos-postales/${cp}`, {
        signal: controller.signal,
      })
      .then((d) => {
        setData({
          colonias: d.colonias ?? [],
          ciudad: d.ciudad ?? "",
          estado: d.estado ?? "",
          municipio: d.municipio ?? "",
        });
      })
      .catch(() => {
        setData({
          colonias: [],
          ciudad: "",
          estado: "",
          municipio: "",
        });
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [cp]);

  return { ...data, loading };
}
