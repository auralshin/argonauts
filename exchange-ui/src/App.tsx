import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExchangeAdmin from "./pages/ExchangeAdmin";
import ExchangeUser from "./pages/ExchangeUser";
import Main from "./pages/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/exchange-user" element={<ExchangeUser />} />
        <Route path="/exchange-admin" element={<ExchangeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
