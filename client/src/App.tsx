import HomePage from "./pages/Home"
import LogIn from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
//import ProfilePage from "./pages/Profile"
//import NotFoundPage from "./pages/NotFound"
import CodeEditor from "./pages/CodeEditor"

export default function App(){
  return(
    <>
      <HomePage/>
      <LogIn/>
      <SignUp />
      <Dashboard/>
      <CodeEditor/>
      
    </>
  )
}