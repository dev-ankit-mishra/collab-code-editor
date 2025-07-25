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

// Lazy load only heavy components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CodeEditor = lazy(() => import("./pages/CodeEditor"));
const AllRepository = lazy(() => import("./components/AllRepository"));
const Recent = lazy(() => import("./components/Recent"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

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
          <Route
            index
            element={
              <Suspense fallback={<SplashScreen />}>
                <Recent />
              </Suspense>
            }
          />
          <Route
            path="allrepository"
            element={
              <Suspense fallback={<SplashScreen />}>
                <AllRepository />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/editor"
          element={
            <ProtectedRoutes>
              <Suspense fallback={<SplashScreen />}>
                <CodeEditor />
              </Suspense>
            </ProtectedRoutes>
          }
        />

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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
