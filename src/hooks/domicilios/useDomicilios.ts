import { useState, useEffect } from "react";
import { useCodigoPostal } from "../codigos-postales/useCodigoPostal";

export function useDomicilios() {
  const [domicilios, setDomicilios] = useState<any[]>([]);
  const [cp, setCp] = useState<string>("");

  const cpData = useCodigoPostal(cp);

  useEffect(() => {
    if (!cp || !cpData) return;

    setDomicilios((prev) =>
      prev.map((d) =>
        d.codigoPostal === cp
          ? {
              ...d,
              colonia: cpData.colonia,
              ciudad: cpData.ciudad,
              estado: cpData.estado,
              municipioId: cpData.municipioId,
            }
          : d
      )
    );
  }, [cp, cpData]);

  function agregar() {
    setDomicilios((prev) => [
      ...prev,
      {
        tipoDomicilio: "",
        nombre: "",
        calle: "",
        numero: "",
        codigoPostal: "",
        colonia: "",
        ciudad: "",
        estado: "",
        municipioId: "",
        celular: "",
        telefono2: "",
        correo: "",
        email: "",
      },
    ]);
  }

  function eliminar(index: number) {
    setDomicilios((prev) => prev.filter((_, i) => i !== index));
  }

  function actualizar(index: number, field: string, value: any) {
    setDomicilios((prev) => {
      const copia = [...prev];
      copia[index] = { ...copia[index], [field]: value };
      return copia;
    });

    if (field === "codigoPostal" && value.length === 5) {
      setCp(value);
    }
  }

  return { domicilios, agregar, eliminar, actualizar };
}
