"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/authenticated")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      if (res.ok) {
        setIsLoggedIn(false);
        toast.success("Logged out successfully!");
        router.push("/login");
        router.refresh();
      } else {
        toast.error("Failed to logout");
        router.push("/login");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold hover:text-blue-200 transition duration-300">
              Resume Builder
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-300"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="flex items-center space-x-2 hover:text-blue-200 transition duration-300"
                >
                  <FaUserCircle className="text-lg" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
