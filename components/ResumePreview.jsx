"use client";
import React from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

const ResumePreview = ({ formData }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.text("Resume Preview", 10, 10);
    doc.text("-----------------------------", 10, 20);
    doc.text("Personal Details:", 10, 30);
    doc.text(`Name: ${formData.personal.name}`, 10, 40);
    doc.text(`Email: ${formData.personal.email}`, 10, 50);
    doc.text(`Contact: ${formData.personal.contact}`, 10, 60);

    doc.text("Education:", 10, 70);
    doc.text(`School: ${formData.education.school}`, 10, 80);
    doc.text(`Degree: ${formData.education.degree}`, 10, 90);
    doc.text(`Graduation Year: ${formData.education.graduationYear}`, 10, 100);

    doc.text("Experience:", 10, 110);
    doc.text(`Company: ${formData.experience.company}`, 10, 120);
    doc.text(`Role: ${formData.experience.role}`, 10, 130);
    doc.text(`Duration: ${formData.experience.duration}`, 10, 140);

    doc.text("Skills:", 10, 150);
    doc.text((formData.skills || []).join(", "), 10, 160);

    doc.save(`${formData.personal.name || "resume"}.pdf`);
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
