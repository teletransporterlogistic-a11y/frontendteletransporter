// src/pages/clientes/ClientesEditar.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/api";
import { ClienteForm } from "@/components/clientes/ClienteForm";

// ===============================
// Tipos
// ===============================
interface Cliente {
  id: string;
  nombre: string;
  tipo?: string;
  rfc?: string;
  calle?: string;
  numero?: string;
  colonia?: string;
  codigoPostal?: string;
  ciudad?: string;
  municipio?: string;
  estado?: string;
  celular?: string;
  telefono2?: string;
  correo?: string;
  email?: string;
  requiereFactura?: boolean;
  retencionIVA?: boolean;
  descuento?: number;
  datosAdicionales?: string;
  domicilios?: Record<string, any>[];
}

interface RouteParams {
  id?: string;
}

// ===============================
// Componente
// ===============================
export default function ClientesEditar() {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  // ===============================
  // Cargar cliente
  // ===============================
  useEffect(() => {
    if (!id) return;

    api
      .get(`/clientes/${id}`)
      .then((res) => setForm(res))
      .finally(() => setLoading(false));
  }, [id]);

  // ===============================
  // Update field
  // ===============================
  function updateField(field: string, value: any) {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  // ===============================
  // Submit
  // ===============================
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!id || !form) return;

    try {
      setSaving(true);
      await api.put(`/clientes/${id}`, form);
      alert("Cliente editado con éxito");
      navigate("/clientes");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al editar el cliente");
    } finally {
      setSaving(false);
    }
  }

  // ===============================
  // Render
  // ===============================
  if (loading || !form) {
    return <div className="card">Cargando...</div>;
  }

  return (
    <ClienteForm
      form={form}
      errors={{}}
      municipiosCP={[]}
      updateField={updateField}
      addDomicilio={() =>
        updateField("domicilios", [...(form.domicilios ?? []), {}])
      }
      updateDomicilio={(index: number, data: any) => {
        const copia = [...(form.domicilios ?? [])];
        copia[index] = { ...copia[index], ...data };
        updateField("domicilios", copia);
      }}
      onSubmit={onSubmit}
      loading={saving}
    />
  );
}
