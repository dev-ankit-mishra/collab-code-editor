import Button from "./Button"
import RecentCard from "./RecentCard"
import { PlusCircle } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import type { DashboardOutlet } from "./Types"


export default function Recent(){

  const {project,setShowModals}:DashboardOutlet=useOutletContext()
  return(
    <div className="w-full flex flex-col">
          <div className=" flex justify-between p-6">
            <h1 className="text-2xl font-semibold tracking-wide">Recent</h1>
            <Button
              onClick={()=>setShowModals(true)}
             >
              <PlusCircle size={18}/> New Projects
            </Button>
          </div>
          <div className="flex items-center flex-wrap gap-8 p-6">
            
            <RecentCard project={project}/>
            
          </div>
        </div>
  )
}