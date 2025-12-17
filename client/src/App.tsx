import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import HomePage from "./pages/Home";
import LogIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFound";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import SplashScreen from "./components/SplashScreen";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import ProfilePage from "./pages/Profile";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Invititions from "./components/Invititions";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const CodeEditor = lazy(() => import("./pages/CodeEditor"));
const AllRepository = lazy(() => import("./components/AllRepository"));
const Recent = lazy(() => import("./components/Recent"));
const Settings= lazy(()=>import("./components/Settings"));
const SharedWithMe=lazy(()=>import("./components/ShareWithMe"))

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LogIn />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* ---------- PROTECTED ROUTES ---------- */}
        <Route
          path="/change-password"
          element={
            <ProtectedRoutes>
              <ChangePassword />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Suspense fallback={<SplashScreen />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoutes>
          }
        >
          <Route index element={<Recent />} />
          <Route path="allrepository" element={<AllRepository />} />
          <Route path="invititions" element={<Invititions />} />
          <Route path="sharewithme" element={<SharedWithMe />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="/editor/:id"
          element={
            <ProtectedRoutes>
              <Suspense fallback={<SplashScreen />}>
                <CodeEditor />
              </Suspense>
            </ProtectedRoutes>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
