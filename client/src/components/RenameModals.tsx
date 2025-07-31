import Input from "./Input";
import Button from "./Button";
import { BiRename } from "react-icons/bi";
import { useAuth } from "../context/useAuth";
import axios from "axios";
import type { FormEvent } from "react";


type RenameModalsProp = {
  setOpen: (val: boolean) => void;
  id:string | undefined
  onRename:(id:string,name:string)=>void
};

export default function RenameModals({ setOpen,id,onRename }: RenameModalsProp) {

  const {session}=useAuth();
async function renameProject(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const name = formData.get("name")?.toString().trim();
  const userId = session?.user.id;

  if (!id || !userId || !name) {
    return;
  }

  try {
    await axios.put(
      `https://codevspace-aqhw.onrender.com/api/projects/${userId}/${id}`,
      { projectName: name }
    );
    console.log("renamed successfully");
    onRename(id,name)
  } catch (err) {
    console.log(err);
  } finally {
    setOpen(false);
  }
}


  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      {/* Modal Container */}
      <div className="bg-[#1a1a1a] rounded-xl p-6 w-[90%] max-w-md relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-white text-lg hover:text-red-400"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Form */}
        <form
          onSubmit={renameProject}
          className="space-y-4"
        >
          <label htmlFor="name" className="block text-white font-medium">
            Enter New Project Name
          </label>
          <Input id="name" name="name" type="text" placeholder="New project name" />

          <Button type="submit" className="w-full flex items-center justify-center gap-2">
            <BiRename size={16} />
            Rename
          </Button>
        </form>
      </div>
    </div>
  );
}
