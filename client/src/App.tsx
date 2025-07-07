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

export default function App(){
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route index element={<Recent/>}/>
          <Route path="allrepository" element={<AllRepository/>}  />
        </Route>
        <Route path="/editor" element={<CodeEditor/>}/>
        <Route path="/editor/:id" element={<CodeEditor/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>  
    </>
  )
}