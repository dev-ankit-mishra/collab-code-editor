import { Download,Settings,Plus } from 'lucide-react';
export default function SideBar(){
  return(
    <nav className=' py-2 px-1 text-gray-300 border-r border-r-white/10'>
          <ul className='space-y-4'>
            <li className='py-2 px-3 hover:bg-neutral-800 transition duration-200 cursor-pointer'><Settings size={20} /></li>
            <li className='py-2 px-3 hover:bg-neutral-800 transition duration-200 cursor-pointer'><Download size={20}/></li>
            <li className='py-2 px-3 hover:bg-neutral-800 transition duration-200 cursor-pointer'><Plus size={20}/></li>
          </ul>

        </nav>
  )
}