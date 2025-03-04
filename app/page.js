"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser, FaFileAlt } from "react-icons/fa";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    } else {
      fetch("/api/authenticated", { credentials: "include" })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Not authenticated");
        })
        .then((data) => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [user]);

  // Conditionally route for the Resume Builder
  const handleResumeBuilderClick = () => {
    if (user) {
      router.push("/resumes/builder");
    } else {
      router.push("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-repeat bg-center"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM37.656 0l8.485 8.485-1.414 1.414L36.242 1.414 37.656 0zM22.344 0L13.858 8.485 15.272 9.9l8.485-8.485L22.344 0zM32.4 0l10.142 10.142-1.414 1.414L30.986 1.414 32.4 0zM27.6 0L17.458 10.142l1.414 1.414L28.014 1.414 27.6 0zM22.344 0L13.858 8.485 15.272 9.9l8.485-8.485L22.344 0zM37.656 0l8.485 8.485-1.414 1.414L36.242 1.414 37.656 0zM32.4 0L41.9 9.9l1.415-1.415L32.4 0zm-4.8 0L18.1 9.9l1.415-1.415L27.6 0zM24.727 0L15.242 9.485l1.415 1.414 8.485-8.485L24.727 0zM35.273 0l9.485 9.485-1.414 1.414-8.485-8.485L35.273 0z' fill='white' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400 animate-gradient">
            Welcome to the Resume Builder
          </h1>

          <p className="text-xl mb-12 text-gray-300 animate-slideUp">
            Create professional resumes in minutes. Stand out from the crowd
            with our modern resume builder.
          </p>

          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 animate-slideUp">
            {/* Conditionally set the link for Profile */}
            <Link href={user ? "/profile" : "/login"}>
              <div className="group relative px-8 py-4 bg-blue-600 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-blue-500/25 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  <FaUser className="text-xl" />
                  <span className="font-semibold text-lg">My Profile</span>
                </div>
              </div>
            </Link>

            <button
              onClick={handleResumeBuilderClick}
              className="group relative px-8 py-4 bg-green-600 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-green-500/25 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <FaFileAlt className="text-xl" />
                <span className="font-semibold text-lg">Resume Builder</span>
              </div>
            </button>
          </div>

          <div className="mt-16 text-gray-400 text-sm animate-fadeIn delay-500">
            Start building your professional resume today
          </div>
        </div>
      </div>
    </main>
  );
}
