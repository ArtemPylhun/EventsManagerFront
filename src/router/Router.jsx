import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import EventsList from "../components/events/EventsList";
import NotFoundPage from "../components/NotFoundPage";
import CategoryComponent from "../components/categories/CategoryComponent";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<EventsList />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/categories" element={<CategoryComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
