import { useParams } from "react-router-dom";
import { useUsuario } from "../../hooks/usuarios/useUsuario";
import { useUpdateUsuario } from "../../hooks/usuarios/useUpdateUsuario";
import { useUsuarioForm } from "../../hooks/usuarios/useUsuarioForm";
import UsuarioForm from "../../components/usuarios/UsuarioForm";
import { useRoles } from "../../hooks/roles/useRoles";

export default function EditarUsuario() {
  const { id } = useParams();
  const usuarioId = Number(id);

  const { data, isLoading } = useUsuario(usuarioId);
  const update = useUpdateUsuario(usuarioId);

  const { form, errors, validate, updateField } = useUsuarioForm(data);

  const { data: roles } = useRoles();

  const onSubmit = () => {
    if (!validate()) return;
    update.mutate(form);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <UsuarioForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={update.isPending}
      roles={roles ?? []}
    />
  );
}
