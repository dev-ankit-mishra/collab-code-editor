import HomePage from "./pages/Home"
import LogIn from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
//import ProfilePage from "./pages/Profile"
import NotFoundPage from "./pages/NotFound"
import CodeEditor from "./pages/CodeEditor"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AllRepository from "./components/AllRepository"
import Recent from "./components/Recent"
import ProtectedRoutes from "./routes/ProtectedRoutes"
import PublicRoute from "./routes/PublicRoute"

export default function App(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={
          <PublicRoute>
            <LogIn/>
          </PublicRoute>
          
          }/>
        <Route path="/signup" element=
        {
          <PublicRoute>
            <SignUp/>
          </PublicRoute>
        
        }/>
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <Dashboard/>
          </ProtectedRoutes>
          
          }>
          <Route index element={<Recent/>}/>
          <Route path="allrepository" element={<AllRepository/>}  />
        </Route>
        <Route path="/editor" element={
          <ProtectedRoutes>
              <CodeEditor/>
          </ProtectedRoutes>
          
          }/>
        <Route path="/editor/:id" element={
          <ProtectedRoutes>
              <CodeEditor/>
          </ProtectedRoutes>
          }/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>  
    </>
  )
}