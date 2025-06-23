
import Editor from '@monaco-editor/react';
import NavBar from '../components/NavBar';
import { Download,Settings,Plus,Play } from 'lucide-react';
import Button from '../components/Button';

export default function CodeEditor() {
  return(
    <section className='w-full h-screen flex flex-col bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-950 text-white'>
      <NavBar  shareRequired userRequired={true}/>
      <main className='w-full h-full flex- 1 flex'>
        <nav className=' py-2 px-1 text-gray-300 border-r border-r-white/10'>
          <ul className='space-y-4'>
            <li className='py-2 px-3 hover:bg-neutral-800 transition duration-200 cursor-pointer'><Settings size={20} /></li>
            <li className='py-2 px-3 hover:bg-neutral-800 transition duration-200 cursor-pointer'><Download size={20}/></li>
            <li className='py-2 px-3 hover:bg-neutral-800 transition duration-200 cursor-pointer'><Plus size={20}/></li>
          </ul>

        </nav>
        <div className='w-full flex flex-col h-full'>
          <ul className='flex justify-between items-center p-[7px] px-10 border border-white/10'>
            <li><select className='border border-white/60 bg-black/80 py-1 px-2 rounded cursor-pointer'>
              <option> --Choose a language-- </option>
              <option>JavaScript</option>
              <option>Java</option>
              <option>TypeScript</option>
              <option>React</option>
              </select></li>
            <li><Button isTransparent className=''><Play size={20}/>Run</Button></li>
            <li>Project Name</li>
          </ul>

          <div className='w-full h-full flex items-center justify-between gap-3 '>
            <Editor height="full" width={"55rem"} theme='vs-dark' defaultLanguage="javascript" defaultValue="// some comment" />
            <Editor height="full" width={"36rem"} theme='vs-dark' defaultLanguage="javascript" defaultValue="// some comment" />
          </div>

        
        </div>

        
        

        
      </main>

      
    </section>
  ) 
}

