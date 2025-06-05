import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import { MedplumClient } from '@medplum/core';
import { MedplumProvider } from '@medplum/react';
import { ThemeProvider } from "./components/theme-provider"


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
const medplum = new MedplumClient({
  baseUrl: 'http://localhost:8103', // Your local Medplum server,
  clientId: '01965a6e-ab7e-74fb-b91e-bf32f8ee2333', // Your client ID
  clientSecret: '6cc4c0e33d7b71b18eeaea966674ba8d5fea82e74b539e1c38681085a3f5213d', // Your client secret
});



root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MedplumProvider medplum={medplum}>
        <ThemeProvider defaultTheme="light" storageKey="medvisor-theme">
          <App />
        </ThemeProvider>
      </MedplumProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
