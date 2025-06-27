
import NavBar from '../components/NavBar';
import CodeArea from '../components/CodeArea';
import SideBar from '../components/SideBar';


export default function CodeEditor() {

 



  return(
    <section className='w-full h-screen flex flex-col bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-950 text-white'>
      <NavBar  shareRequired userRequired={true}/>
      <main className='w-full h-full flex- 1 flex'>
        <SideBar/>
          <div className='flex-1'>
              <CodeArea/>
             
          </div>      
      </main>

      
    </section>
  ) 
}

