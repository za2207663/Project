"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    const result = await signIn("google", { callbackUrl: "/stats" });
    if (result?.error) {
      setError(result.error);
    }
  };

  const handleSubmit = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const role = formData.get("role");

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      role,
    });

    if (result?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/stats");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-maroon">
          University Course System
        </h1>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path
              fill="#4285F4"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg>
          Sign in with Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
          className="space-y-6"
        >

        
          <div className="space-y-4">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                name="username"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="admin">Admin</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-maroon hover:bg-dark-maroon"
          >
            Sign in
          </button>
        </form>
            <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="ml-4 bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 text-sm"
      >
        Sign Out
      </button>
      </div>
    </div>
  );
}
