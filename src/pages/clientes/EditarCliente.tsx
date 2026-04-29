import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { ClienteForm } from "../../components/clientes/ClienteForm"; // ← RUTA CORRECTA

export default function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get(`/clientes/${id}`)
      .then((res) => setForm(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  function updateField(field: string, value: any) {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
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

  if (loading || !form) return <div className="card">Cargando...</div>;

  return (
    <ClienteForm
      form={form}
      errors={{}}
      municipiosCP={[]}
      updateField={updateField}
      addDomicilio={() =>
        updateField("domicilios", [...(form.domicilios || []), {}])
      }
      updateDomicilio={(index: number, data: any) => {
        const copia = [...(form.domicilios || [])];
        copia[index] = { ...copia[index], ...data };
        updateField("domicilios", copia);
      }}
      onSubmit={onSubmit}
      loading={saving}
    />
  );
}
