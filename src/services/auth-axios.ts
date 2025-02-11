import { notification } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const AuthAxios = import.meta.env.PROD
  ? axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })
  : axios.create({
      baseURL: import.meta.env.VITE_LOCAL_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

AuthAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AuthAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      notification.error({
        message: "Atenção!",
        description:
          "Sua sessão expirou, faça login novamente, você está sendo redirecionado...",
      });
      await wait(3000);
      window.location.href = "/";
    }
    if (error.response?.status === 403) {
      notification.error({
        message: "Atenção!",
        description:
          "Você já está logado",
      });
      await wait(3000);
      window.location.href = "/profile";
    }

    if (error.code && error.code === "ERR_NETWORK") {
      return Promise.reject("Sem conexão com o servidor");
    }

    const errorMessage =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "Erro Desconhecido";

    return Promise.reject(new Error(errorMessage));
  }
);

export { AuthAxios };
