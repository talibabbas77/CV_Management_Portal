"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MultiStepForm from "@/components/MultiStepForm";

const SearchParamsWrapper = ({ children }) => {
  const searchParams = useSearchParams();
  return children(searchParams);
};

const BuilderPage = () => {
  const router = useRouter();
  const [resumeData, setResumeData] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsWrapper>
          {(searchParams) => {
            const resumeId = searchParams.get("id");

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
              const url = resumeId
                ? `/api/resumes/${resumeId}`
                : "/api/resumes";
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
              <MultiStepForm existingData={resumeData} onSave={handleSave} />
            );
          }}
        </SearchParamsWrapper>
      </Suspense>
    </div>
  );
};

export default BuilderPage;
