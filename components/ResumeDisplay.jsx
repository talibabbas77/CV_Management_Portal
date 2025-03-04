"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaDownload, FaArrowLeft } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import jsPDF from "jspdf";

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
      {title}
    </h3>
    <div className="pl-4">{children}</div>
  </div>
);

const ResumeDisplay = ({ resume }) => {
  const router = useRouter();
  const { user } = useUser();

  const handleDownload = () => {
    const doc = new jsPDF();

    doc.text("Resume Preview", 10, 10);
    doc.text("-----------------------------", 10, 20);
    doc.text("Personal Details:", 10, 30);
    doc.text(`Name: ${resume.personal.name}`, 10, 40);
    doc.text(`Email: ${user?.email || resume.personal.email}`, 10, 50);
    doc.text(`Contact: ${resume.personal.contact}`, 10, 60);

    doc.text("Education:", 10, 70);
    doc.text(`School: ${resume.education.school}`, 10, 80);
    doc.text(`Degree: ${resume.education.degree}`, 10, 90);
    doc.text(`Graduation Year: ${resume.education.graduationYear}`, 10, 100);

    doc.text("Experience:", 10, 110);
    doc.text(`Company: ${resume.experience.company}`, 10, 120);
    doc.text(`Role: ${resume.experience.role}`, 10, 130);
    doc.text(`Duration: ${resume.experience.duration}`, 10, 140);

    doc.text("Skills:", 10, 150);
    doc.text((resume.skills || []).join(", "), 10, 160);

    doc.save(`${resume.personal.name || "resume"}.pdf`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl">
        <header className="text-center mb-8 pb-6 border-b-2 border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {resume.personal.name}
          </h1>
          <div className="text-gray-600 space-x-4">
            <span>{user?.email || resume.personal.email}</span>
            <span>•</span>
            <span>{resume.personal.contact}</span>
          </div>
        </header>
        {/* Experience */}
        <Section title="Experience">
          <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-800">
                  {resume.experience.role}
                </h4>
                <p className="text-gray-600">{resume.experience.company}</p>
              </div>
              <span className="text-gray-500 text-sm">
                {resume.experience.duration}
              </span>
            </div>
          </div>
        </Section>

        {/* Education */}
        <Section title="Education">
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-800">
                  {resume.education.degree}
                </h4>
                <p className="text-gray-600">{resume.education.school}</p>
              </div>
              <span className="text-gray-500 text-sm">
                {resume.education.graduationYear}
              </span>
            </div>
          </div>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {(resume.skills || []).map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t-2 border-gray-200 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition-all duration-300"
          >
            <FaArrowLeft />
            <span>Back</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <FaDownload />
            <span>Download Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeDisplay;
