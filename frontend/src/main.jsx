import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster richColors position="top-right" />
    </AuthProvider>
  </StrictMode>,
);
