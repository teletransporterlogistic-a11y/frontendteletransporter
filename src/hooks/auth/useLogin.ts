import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest, LoginResponse } from "../../services/auth.service";

export function useLogin() {
  const qc = useQueryClient();

  return useMutation<LoginResponse, Error, { email: string; password: string }>({
    mutationFn: ({ email, password }) => loginRequest(email, password),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      qc.setQueryData(["me"], {
        id: data.user.id,
        nombre: data.user.nombre,
        email: data.user.email,
        rolId: data.user.rolId,
        permisos: data.user.permisos,
      });
    },
  });
}
