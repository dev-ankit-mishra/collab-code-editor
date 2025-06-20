export default function NavBar({ authRequired = true }) {
  return (
    <nav className="bg-[#0c0f1a] opacity-96 shadow-md shadow-black/40 border-b border-b-white/5 w-full py-3 flex flex-row justify-between items-center px-40">
      <h1 className="text-xl font-semibold text-gray-200 hover:text-green-500">CodeCollab</h1>
      {authRequired && (
        <div className="flex flex-row gap-6 items-center">
          <button className="rounded-lg px-4 py-2 font-medium border border-green-700 transition-all duration-200 hover:scale-102 hover:bg-green-500/20 cursor-pointer shadow-lg shadow-black/40 hover:shadow-xl">
            Log In
          </button>
          <button className="rounded-lg bg-green-700 font-medium shadow-lg shadow-black/40 hover:bg-green-600 hover:scale-102 hover:shadow-xl transition-all duration-200 cursor-pointer px-4 py-2">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
