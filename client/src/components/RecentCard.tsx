import { Ellipsis } from "lucide-react";
import type {RecentCardProps } from "./Types";
import { formatDistanceToNow  } from "date-fns";
import {useNavigate} from "react-router-dom"



export default function RecentCard({ project }: RecentCardProps) {
  const navigate=useNavigate()
  return (
    <>
      {project.map((p) => (
        <div
          key={p._id}
          className="w-68 h-40 bg-gray-700/30 border border-white/10 shadow-md hover:scale-102 hover:shadow-xl transition-all cursor-pointer duration-300 p-5 rounded-md"
          onClick={()=>navigate(`/editor/${p._id}`)}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg">{p.projectName}</span>
            <Ellipsis size={16} className="cursor-pointer" />
          </div>

          <p className="text-sm text-gray-300">{formatDistanceToNow(new Date(p.time ?? 0), { addSuffix: true })}</p>

          <p className="text-sm text-gray-300 mt-12">Created by you</p>
        </div>
      ))}
    </>
  );
}
