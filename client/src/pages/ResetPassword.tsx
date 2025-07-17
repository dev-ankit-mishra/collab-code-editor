import Button from "../components/Button"
import Input from "../components/Input"
import NavBar from "../components/NavBar"
import { useState } from "react"
import { useAuth } from "../context/useAuth"


export default function ForgotPassword(){

  const [loading,setLoading]=useState(false)
  const [error,setError]=useState()
  const {resetPassword}=useAuth()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true)
  const form = e.currentTarget; // Get the form element
  const formData = new FormData(form);
  const email = formData.get("email") as string;

  try {
    const data = await resetPassword(email);

    if (data?.error) {
      throw new Error(data.error);
    }

  } catch (err: any) {
    setError(err?.message || "An unexpected error occurred.");
    console.error(err);
  } finally{
    setLoading(false)
  }
}

  return(
    <section className="w-full h-screen flex flex-col">
      <NavBar authRequired={false} />
      <main className="flex-1 flex flex-col items-center text-white bg-gradient-to-b from-black via-gray-900 to-[#0c0f1a]">
        <div className="bg-black/40 border border-white/10 text-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-auto mt-20">
          <h2 className="text-2xl font-bold mb-3 text-center">Reset Your Password</h2>
          <p className="text-sm text-gray-300 text-center mb-5">
            Enter your email address below and we’ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </div>

            <Button type="submit" disabled={loading} className="mt-4">{loading?"Submitting...":"Submit"}</Button>
          </form>

          {error && <p className="text-red-500 pt-4 text-center">{error}</p>}
          
        </div>
      </main>
    </section>
  )
}








