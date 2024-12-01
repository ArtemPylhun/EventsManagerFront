import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import EventsList from "../components/events/EventsList";
import NotFoundPage from "../components/NotFoundPage";
import CategoryComponent from "../components/categories/CategoryComponent";
import TagComponent from "../components/tags/TagComponent";
import UserComponent from "../components/users/UserComponent";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<EventsList />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <UserComponent />
              </ProtectedRoute>
          }
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <CategoryComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <CategoryComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tags"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <TagComponent />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
