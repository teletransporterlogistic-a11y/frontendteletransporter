import { useEffect, useState } from "react";
import api from "../../api/api";

type CpData = {
  colonias: string[];
  ciudad: string;
  estado: string;
  municipio: string;
};

export function useCodigoPostal(cp: string) {
  const [data, setData] = useState<CpData>({
    colonias: [],
    ciudad: "",
    estado: "",
    municipio: "",
  });

  const [loading, setLoading] = useState(false);

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
      .get(`/codigos-postales/${cp}`, { signal: controller.signal })
      .then((res) => {
        const d = res.data;
        setData({
          colonias: d.colonias || [],
          ciudad: d.ciudad || "",
          estado: d.estado || "",
          municipio: d.municipio || "",
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
