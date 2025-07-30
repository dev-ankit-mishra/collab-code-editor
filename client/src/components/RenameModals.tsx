import Input from "./Input";
import Button from "./Button";
import { BiRename } from "react-icons/bi";

type RenameModalsProp = {
  setOpen: (val: boolean) => void;
  id:string | undefined
};

export default function RenameModals({ setOpen,id }: RenameModalsProp) {


  async function handleSubmit(){
    console.log(id)
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
          onSubmit={(e) => {
            e.preventDefault();
            // handle rename logic here
            handleSubmit()
            setOpen(false);
          }}
          className="space-y-4"
        >
          <label htmlFor="name" className="block text-white font-medium">
            Enter New Project Name
          </label>
          <Input id="name" type="text" placeholder="New project name" />

          <Button type="submit" className="w-full flex items-center justify-center gap-2">
            <BiRename size={16} />
            Rename
          </Button>
        </form>
      </div>
    </div>
  );
}
