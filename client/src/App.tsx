import HomePage from "./pages/Home"
import LogIn from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
//import ProfilePage from "./pages/Profile"
import NotFoundPage from "./pages/NotFound"
import CodeEditor from "./pages/CodeEditor"
import {BrowserRouter,Routes,Route} from "react-router-dom"

export default function App(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/editor" element={<CodeEditor/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>  
    </>
  )
}