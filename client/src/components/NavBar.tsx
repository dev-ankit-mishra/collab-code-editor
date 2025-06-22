import { CircleUserRound } from 'lucide-react';
import Button from './Button';

export default function NavBar({ authRequired = true,userRequired=false}) {

  
  return (
    <nav className="bg-[#0c0f1a] opacity-96 shadow-md shadow-black/40 border-b border-b-white/5 w-full py-3 flex flex-row justify-between items-center px-10">
      <h1 className="text-xl font-semibold text-gray-200 hover:text-green-500">CodeCollab</h1>
      {authRequired && (
        <div className="flex flex-row gap-6 items-center">
          
          <Button isTransparent={true}>Log In</Button>
          <Button>Sign Up</Button>
          
        </div>
      )}
      {
        userRequired && (
          <div className='flex  gap-2 items-center'>
             <CircleUserRound size={24} />
             <span>amishra26445</span>
          </div>
        )
      }
      
    </nav>
  );
}
