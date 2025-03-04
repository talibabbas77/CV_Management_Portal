"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ResumePreview = ({ formData }) => {
  const handleDownload = () => {
    const data = `
Resume Preview:
-----------------------------
Personal Details:
  Name: ${formData.personal.name}
  Email: ${formData.personal.email}
  Contact: ${formData.personal.contact}

Education:
  School: ${formData.education.school}
  Degree: ${formData.education.degree}
  Graduation Year: ${formData.education.graduationYear}

Experience:
  Company: ${formData.experience.company}
  Role: ${formData.experience.role}
  Duration: ${formData.experience.duration}

Skills:
  ${(formData.skills || []).join(", ")}
    `;
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.personal.name || "resume"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 bg-white text-black shadow rounded">
      <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
      <div className="mb-4">
        <h3 className="font-bold">Personal Details</h3>
        <p>Name: {formData.personal.name}</p>
        <p>Email: {formData.personal.email}</p>
        <p>Contact: {formData.personal.contact}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Education</h3>
        <p>School: {formData.education.school}</p>
        <p>Degree: {formData.education.degree}</p>
        <p>Graduation Year: {formData.education.graduationYear}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Experience</h3>
        <p>Company: {formData.experience.company}</p>
        <p>Role: {formData.experience.role}</p>
        <p>Duration: {formData.experience.duration}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Skills</h3>
        <p>{(formData.skills || []).join(", ")}</p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
