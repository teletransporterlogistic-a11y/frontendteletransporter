import { useCreateRol } from "../../hooks/roles/useCreateRol";
import { useRolForm } from "../../hooks/roles/useRolForm";
import RolForm from "../../components/roles/RolForm";

export default function NuevoRol() {
  const create = useCreateRol();
  const { form, errors, validate, updateField } = useRolForm();

  const onSubmit = () => {
    if (!validate()) return;
    create.mutate(form);
  };

  return (
    <RolForm
      form={form}
      errors={errors}
      updateField={updateField}
      onSubmit={onSubmit}
      loading={create.isPending}
    />
  );
}
