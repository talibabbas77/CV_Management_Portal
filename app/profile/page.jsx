"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaEye, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import jsPDF from "jspdf";

const ResumeCard = ({ resume, onDelete, onDownload, router }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-xl shadow-lg">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">
          {resume.personal?.name || "Unnamed Resume"}
        </h3>
        <p className="text-gray-400">{resume.personal?.email}</p>
        <p className="text-gray-400">Created by: {resume.user?.name}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {resume.skills?.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="text-xs bg-blue-900/50 text-blue-200 px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
          {resume.skills?.length > 3 && (
            <span className="text-xs bg-blue-900/50 text-blue-200 px-2 py-1 rounded">
              +{resume.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => router.push(`/resumes/preview?id=${resume._id}`)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg
            transition-all duration-300 hover:scale-105"
        >
          <FaEye /> Preview
        </button>
        <button
          onClick={() => router.push(`/resumes/builder?id=${resume._id}`)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg
            transition-all duration-300 hover:scale-105"
        >
          <FaEdit /> Edit
        </button>
        <button
          onClick={() => onDelete(resume._id)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg
            transition-all duration-300 hover:scale-105"
        >
          <FaTrash /> Delete
        </button>
        <button
          onClick={() => onDownload(resume)}
          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg
            transition-all duration-300 hover:scale-105"
        >
          <FaDownload /> Download
        </button>
      </div>
    </div>
  </div>
);

const Page = () => {
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/authenticated", { credentials: "include" })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  useEffect(() => {
    if (user) {
      const fetchResumes = async () => {
        try {
          const res = await fetch("/api/resumes");
          const data = await res.json();
          setResumes(data);
        } catch (error) {
          toast.error("Failed to fetch resumes");
        } finally {
          setIsLoading(false);
        }
      };
      fetchResumes();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this resume?"
      );
      if (!confirmed) return;

      await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      setResumes((prev) => prev.filter((r) => r._id !== id));
      toast.success("Resume deleted successfully");
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };

  const handleDownload = (resume) => {
    const doc = new jsPDF();

    doc.text("Resume Preview", 10, 10);
    doc.text("-----------------------------", 10, 20);
    doc.text("Personal Details:", 10, 30);
    doc.text(`Name: ${resume.personal?.name || ""}`, 10, 40);
    doc.text(`Email: ${resume.personal?.email || ""}`, 10, 50);
    doc.text(`Contact: ${resume.personal?.contact || ""}`, 10, 60);

    doc.text("Education:", 10, 70);
    doc.text(`School: ${resume.education?.school || ""}`, 10, 80);
    doc.text(`Degree: ${resume.education?.degree || ""}`, 10, 90);
    doc.text(
      `Graduation Year: ${resume.education?.graduationYear || ""}`,
      10,
      100
    );

    doc.text("Experience:", 10, 110);
    doc.text(`Company: ${resume.experience?.company || ""}`, 10, 120);
    doc.text(`Role: ${resume.experience?.role || ""}`, 10, 130);
    doc.text(`Duration: ${resume.experience?.duration || ""}`, 10, 140);

    doc.text("Skills:", 10, 150);
    doc.text((resume.skills || []).join(", "), 10, 160);

    doc.save(`${resume.personal?.name || "resume"}.pdf`);
    toast.success("Resume downloaded successfully");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Resumes</h1>
          <button
            onClick={() => router.push("/resumes/builder")}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg
              transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <FaPlus /> Create New Resume
          </button>
        </div>

        <div className="space-y-4">
          {resumes.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No resumes found. Create your first resume!
            </div>
          ) : (
            resumes.map((resume) => (
              <ResumeCard
                key={resume._id}
                resume={resume}
                onDelete={handleDelete}
                onDownload={handleDownload}
                router={router}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
