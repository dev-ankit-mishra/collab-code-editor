import NavBar from '../components/NavBar';
import CodeArea from '../components/CodeArea';
import SideBar from '../components/SideBar';
import { useState, useEffect } from 'react';
import { useParams,useLocation } from 'react-router-dom';
import { language } from '../components/languages';

export default function CodeEditor() {
  const { id } = useParams();
  const [code, setCode] = useState<string>("Loading...");
  const location=useLocation()
  const [projectName,setProjectName]=useState<string>("")
  const [template,setTemplate]=useState(language[0])



  
  
  useEffect(()=>{
    setProjectName(location.state?.projectObject.projectName || "")
    setTemplate(location.state?.lang || language[0])
  },[location.state])

  useEffect(() => {
    const fetchByProject = async () => {
      if (!id) {
        setCode("");
        return;
      }

      try {
        const res = await fetch(`https://codevspace-aqhw.onrender.com/api/projects/${id}`);
        
        // Check if the request failed
        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(`Fetch failed: ${res.status} - ${errMsg}`);
        }

        const data = await res.json();

        setCode(data.code || "// No code found in project");
        setProjectName(data.projectName || "");
      } catch (err) {
        console.error("❌ Failed to load project code:", err);
        setCode("// Error loading project");
      }
    };

    fetchByProject();
  }, [id]);

  return (
    <section className='w-full h-screen flex flex-col bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-950 text-white'>
      <NavBar shareRequired userRequired={true} projectName={projectName} />
      <main className='w-full h-full flex-1 flex'>
        <SideBar />
        <div className='flex-1'>
          <CodeArea code={code} template={template}/>
        </div>
      </main>
    </section>
  );
}
