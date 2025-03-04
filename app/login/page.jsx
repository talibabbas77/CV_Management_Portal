"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";
const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative mb-4">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="text-gray-400" />
    </div>
    <input
      {...props}
      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white 
      focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300
      hover:border-gray-500"
    />
  </div>
);

const Page = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");
        setUser(data.user);
        router.push("/profile");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative w-full max-w-md p-8 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="absolute inset-0 bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl"></div>

        <div className="relative z-10 animate-fadeIn">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              icon={FaEnvelope}
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <InputField
              icon={FaLock}
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded-lg text-white
                flex items-center justify-center space-x-2 transform transition-all duration-300
                hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSignInAlt className={isLoading ? "animate-spin" : ""} />
              <span>{isLoading ? "Logging in..." : "Login"}</span>
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300
                hover:underline font-medium"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Page;
