import Button from "../components/Button";
import Input from "../components/Input";
import NavBar from "../components/NavBar";
import { useState } from "react";

export default function ConfirmPassword() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  function handleSubmit() {}
  return (
    <section className="w-full h-screen flex flex-col">
      <NavBar authRequired={false} />
      <main className="flex-1 flex flex-col items-center text-white bg-gradient-to-b from-black via-gray-900 to-[#0c0f1a]">
        <div className="bg-black/40 border border-white/10 text-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-auto mt-20">
          <h2 className="text-2xl font-bold mb-3 text-center">
            Set a New Password
          </h2>
          <p className="text-sm text-gray-300 text-center mb-5">
            Enter and confirm your new password to secure your account.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-300 mb-1"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label
                htmlFor="cnfpassword"
                className="block text-sm text-gray-300 mb-1"
              >
                Confirm Password
              </label>
              <Input
                id="cnfpassword"
                name="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" disabled={loading} className="mt-4">
              {loading ? "Logging..." : "Submit"}
            </Button>
          </form>

          {error && <p className="text-red-500 pt-4 text-center">{error}</p>}
        </div>
      </main>
    </section>
  );
}
