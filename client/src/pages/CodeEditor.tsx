import NavBar from '../components/NavBar';
import CodeArea from '../components/CodeArea';
import SideBar from '../components/SideBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function CodeEditor() {
  const { id } = useParams();
  const [code, setCode] = useState<string>("Loading...");

  useEffect(() => {
    const fetchByProject = async () => {
      if (!id) {
        setCode("// Invalid Project ID");
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
      } catch (err) {
        console.error("❌ Failed to load project code:", err);
        setCode("// Error loading project");
      }
    };

    fetchByProject();
  }, [id]);

  return (
    <section className='w-full h-screen flex flex-col bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-950 text-white'>
      <NavBar shareRequired userRequired={true} />
      <main className='w-full h-full flex-1 flex'>
        <SideBar />
        <div className='flex-1'>
          <CodeArea code={code} />
        </div>
      </main>
    </section>
  );
}
