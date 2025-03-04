"use client";
import Link from "next/link";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();

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
            {user ? (
              <button
                onClick={logout}
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
