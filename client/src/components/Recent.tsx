import Button from "./Button"
import RecentCard from "./RecentCard"
import { PlusCircle } from "lucide-react"
import { useOutletContext } from "react-router-dom"
import type { DashboardOutlet } from "./Types"


export default function Recent(){
  const {project,setShowModals,handleDelete}:DashboardOutlet=useOutletContext()

  const top5Projects = project
  .filter(p => p.updatedAt) // optional: exclude undefined timestamps
  .sort((a, b) =>
    new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime()
  )
  .slice(0, 5);


  return(
    <div className="w-full flex flex-col">
          <div className=" flex justify-between p-6">
            <h1 className="text-2xl font-semibold tracking-wide">Recent</h1>
            <Button
              onClick={()=>setShowModals(true)}
             >
              <PlusCircle size={16}/> New Projects
            </Button>
          </div>
          <div className="flex items-center flex-wrap gap-8 p-6">
            
            <RecentCard project={top5Projects} onDelete={handleDelete}/>
            
          </div>
        </div>
  )
}