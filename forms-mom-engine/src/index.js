import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppRegister from "./App_register";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppRegister />
  </StrictMode>
);