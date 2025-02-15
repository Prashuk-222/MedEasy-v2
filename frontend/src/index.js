import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "../src/app/HomePage.tsx";
import SignIn from "./app/(auth)/SignIn.tsx";
import SignUp from "./app/(auth)/SignUp.tsx";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
