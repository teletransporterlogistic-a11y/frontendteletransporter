import { ReactNode } from "react";
import { useMe } from "../../hooks/auth/useMe";

export function Can({
  permission,
  children,
}: {
  permission: string;
  children: ReactNode;
}) {
  const { data } = useMe();

  if (!data) return null;
  if (!data.permisos.includes(permission)) return null;

  return <>{children}</>;
}
