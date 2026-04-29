import { useCreateUsuario } from "../../hooks/usuarios/useCreateUsuario";
import { useUsuarioForm } from "../../hooks/usuarios/useUsuarioForm";
import UsuarioForm from "../../components/usuarios/UsuarioForm";
import { useRoles } from "../../hooks/roles/useRoles";

export default function NuevoUsuario() {
  const create = useCreateUsuario();
  const { form, errors, validate, updateField } = useUsuarioForm();

  const { data: roles } = useRoles();

  const onSubmit = () => {
    if (!validate()) return;
    create.mutate(form);
  };

  return (
    <UsuarioForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={create.isPending}
      roles={roles ?? []}
    />
  );
}
