import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "./context/ThemeContext.jsx";

import "./styles/theme.css";
import "./index.css";
import "leaflet/dist/leaflet.css";

import { apiFetch } from "./lib/apiFetch";

const queryClient = new QueryClient();

// 🔥 Mover la llamada inicial dentro de una función
async function initApp() {
  try {
    await apiFetch("/api/usuarios");
  } catch (err) {
    console.error("Error inicial al cargar usuarios:", err);
  }
}

initApp(); // Ejecutar sin bloquear el render

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
