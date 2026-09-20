import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Properties from "../pages/Properties";
import PropertyDetails from "../pages/PropertyDetails";
import PublishProperty from "../pages/PublishProperty";
import MyProperties from "../pages/MyProperty";
import ReportVacancy from "../pages/ReportVacancy";
import NotFound from "../pages/NotFound";
import OwnerProfile from "../pages/OwnerProfile";
import TenantProfile from "../pages/TenantProfile";

interface UserData {
  id: string;
  name: string;
  role?: "tenant" | "landlord" | "admin";
  
}

interface AppRoutesProps {
  userData?: UserData | null;
}

export const AppRoutes: React.FC<AppRoutesProps> = () => {
  const isAuthenticated = false;
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />
        }
      />

      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />

      <Route
        path="/publish"
        element={
          isAuthenticated ? (
            <PublishProperty />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/my-properties"
        element={
          isAuthenticated ? <MyProperties /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/report-vacancy"
        element={
          isAuthenticated ? <ReportVacancy /> : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/owner-profile"
        element={
          isAuthenticated ? <OwnerProfile /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/tenant-profile"
        element={
          isAuthenticated ? <TenantProfile /> : <Navigate to="/login" replace />
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
