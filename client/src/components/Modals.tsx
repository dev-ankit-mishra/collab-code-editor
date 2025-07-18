import Button from "./Button";
import { PlusCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import { language } from "./languages";
import { useAuth } from "../context/useAuth";
import type { Language } from "./Types";

import type { ModalProps, ProjectDetails } from "./Types";

export default function Modals({ setShowModals, create }: ModalProps) {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [lang, setLang] = useState(language[0]);
  const { session } = useAuth();
  const userId = session?.user?.id;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => setIsError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  async function actionFunction(formData: FormData) {
    setLoading(true);
    const projectRawValue = formData.get("project");
    const projectName =
      typeof projectRawValue === "string" ? projectRawValue.trim() : "";

    if (!projectName || !userId) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const langObj={
      label:lang.label,
      version:lang.version,
      boilerplate:lang.boilerplate
    }

    const projectObj: ProjectDetails = {
      projectName,
      userId,
      code: "",
      template: langObj,
    };

    try {
      const newId = await create(projectObj);

      if (newId) {
        const projectObject = { ...projectObj, _id: newId };
        navigate(`/editor/${newId}`, {
          state: { projectObject },
        });
        setShowModals(false);
      } else {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleLangChange(selectedLang: Language) {
  console.log("Selected:", selectedLang.label);
  setLang(selectedLang);
  }



  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="w-[400px] bg-neutral-900 px-6 py-8 rounded-xl relative border border-white/10 shadow-md">
        <button
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowModals(false)}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            actionFunction(formData);
          }}
        >
          <div className="flex flex-col gap-1.5">
            <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>

            <label htmlFor="project" className="block ">
              Enter Project Name
            </label>
            <input
              id="project"
              name="project"
              type="text"
              autoComplete="off"
              placeholder="Project Name"
              className="py-1 px-3 bg-gray-900 text-white placeholder-gray-400 border border-white/20 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              required
              disabled={loading}
            />

            <label htmlFor="template" className="block  mt-5">
              Select Template
            </label>
            {/* <select
              id="template"
              className="px-3 py-1 rounded bg-gray-800 border border-white/10 text-gray-100"
              value={lang.label}
              onChange={handleLangChange}
              disabled={loading}
            >
              {language.map((lang) => (
                <option key={lang.label} value={lang.label}>
                  {lang.label}
                </option>
              ))}
            </select> */}
            <div className="grid grid-cols-3 gap-12 gap-x-16 py-8 p-6">
              {
                language.map((item)=>{
                  const Icon=item.icon

                  if(Icon){
                    return(
                    <div key={item.label} className="flex flex-col items-center justify-center gap-2">
                      <div onClick={()=>handleLangChange(item)} className={`p-2 rounded cursor-pointer border transition-all duration-200
                      ${lang.label === item.label
                      ? "border-blue-400 bg-blue-900/30 shadow-[0_0_0_2px_#3b82f6]"
                    : "hover:bg-neutral-800 border-white/20"}`}
                        >
                        <Icon size={28} className={item.color}/>
                      </div>
                      <p className="text-xs text-gray-200">{item.label}</p>
                    </div>
                  )
                  }
                
                  
                })
              }

            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full block">
            <PlusCircle size={18} /> {loading ? "Creating..." : "Create"}
          </Button>

          {isError && (
            <p className="text-red-500 pt-4 text-sm">
              Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
