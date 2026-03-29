"use client";
import Link from "next/link";
import { BASE_API_URL } from "@/global";
import { storeCookie } from "@/lib/client.cookies";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

type responseLogin = {
  success: boolean;
  message: string;
  token: string;
  role: string;
};

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/auth`;
      const payload = JSON.stringify({ username: email, password });
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          "app-key": "aa042f315362b44b57c5a67cda3a7b6d0f386834",
        },
      });
      const data: responseLogin = response.data;

      if (data.success == true) {
        toast(data.message, {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "success",
          autoClose: 2000,
        });

        storeCookie("token", data.token);
        storeCookie("role", data.role);

        if (data.role === `ADMIN`)
          setTimeout(() => router.replace(`/admin/dashboard`), 1000);
      } else {
        toast("Anda bukan admin", {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "success",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast(`Something wrong`, {
        hideProgressBar: true,
        containerId: `toastLogin`,
        type: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      
      <ToastContainer containerId={`toastLogin`} />

      <div className="w-full max-w-md p-8 bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl">
        
        <h1 className="text-2xl font-bold mb-6 tracking-tight">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-5">
            <label className="block text-gray-400 mb-2">
              Username
            </label>
            <input
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">
              Password
            </label>
            <input
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition p-3 rounded-lg font-semibold"
            type="submit"
          >
            Login
          </button>

          <p className="text-gray-400 mt-4 text-sm">
            Don't have an account?{" "}
            <Link 
              className="text-indigo-400 hover:underline" 
              href={"/admin/register"}
            >
              Register here
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;