"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MultiStepForm from "@/components/MultiStepForm";

const BuilderPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    if (resumeId) {
      const fetchResume = async () => {
        const res = await fetch(`/api/resumes/${resumeId}`);
        const data = await res.json();
        setResumeData(data);
      };
      fetchResume();
    }
  }, [resumeId]);

  const handleSave = async (formData) => {
    const method = resumeId ? "PUT" : "POST";
    const url = resumeId ? `/api/resumes/${resumeId}` : "/api/resumes";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      router.push("/profile");
    } else {
      console.error("Failed to save resume");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <MultiStepForm existingData={resumeData} onSave={handleSave} />
    </div>
  );
};

export default BuilderPage;
