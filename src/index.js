import React from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";

const queryClient = new QueryClient();

render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
