import { useParams } from "react-router-dom";
import { useRol } from "../../hooks/roles/useRol";
import { useUpdateRol } from "../../hooks/roles/useUpdateRol";
import { useRolForm } from "../../hooks/roles/useRolForm";
import RolForm from "../../components/roles/RolForm";
import PermisosMatrix from "../../components/roles/PermisosMatrix";

export default function EditarRol() {
  const { id } = useParams();
  const rolId = Number(id);

  const { data, isLoading } = useRol(rolId);
  const update = useUpdateRol(rolId);

  const { form, errors, validate, updateField } = useRolForm(data);

  const onSubmit = () => {
    if (!validate()) return;
    update.mutate(form);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <RolForm
        form={form}
        errors={errors}
        updateField={updateField}
        onSubmit={onSubmit}
        loading={update.isPending}
      />

      <h2>Permisos</h2>
      <PermisosMatrix rolId={rolId} />
    </div>
  );
}
