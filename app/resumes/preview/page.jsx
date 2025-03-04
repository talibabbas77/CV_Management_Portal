"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ResumeDisplay from "@/components/ResumeDisplay";

const SearchParamsWrapper = ({ children }) => {
  const searchParams = useSearchParams();
  return children(searchParams);
};

const Page = () => {
  const router = useRouter();
  const [resume, setResume] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <SearchParamsWrapper>
          {(searchParams) => {
            const id = searchParams.get("id");

            useEffect(() => {
              if (id) {
                fetch(`/api/resumes/${id}`)
                  .then((res) => res.json())
                  .then((data) => setResume(data))
                  .catch((err) => console.error(err));
              }
            }, [id]);

            if (!resume) return <div className="p-4">Loading...</div>;

            return (
              <>
                <ResumeDisplay resume={resume} isEditable={false} />
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() =>
                      router.push(`/resumes/builder?id=${resume._id}`)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                  >
                    Edit Resume
                  </button>
                </div>
              </>
            );
          }}
        </SearchParamsWrapper>
      </Suspense>
    </div>
  );
};

export default Page;
