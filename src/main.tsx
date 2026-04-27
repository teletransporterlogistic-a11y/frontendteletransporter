import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "./router/AppRouter";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider } from "./context/ThemeContext";

import "./styles/theme.css";
import "./index.css";
import "leaflet/dist/leaflet.css";

import api from "./api/api"; // usa tu cliente TS real

// ===============================
// Query Client
// ===============================
const queryClient = new QueryClient();

// ===============================
// Inicialización opcional
// ===============================
async function initApp(): Promise<void> {
  try {
    await api.get("/api/usuarios");
  } catch (err) {
    console.error("Error inicial al cargar usuarios:", err);
  }
}

initApp();

// ===============================
// Render principal
// ===============================
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("❌ No se encontró el elemento #root en index.html");
}

ReactDOM.createRoot(rootElement).render(
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
