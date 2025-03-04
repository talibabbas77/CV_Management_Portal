"use client";

import { useState, useEffect } from "react";
import PersonalDetails from "./PersonalDetails";
import EducationForm from "./EducationForm";
import ResumePreview from "./ResumePreview";
import Experience from "./Experience";
import { FaUser, FaGraduationCap, FaBriefcase, FaEye, FaArrowLeft, FaArrowRight, FaSave } from "react-icons/fa";
import toast from 'react-hot-toast';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { icon: FaUser, label: "Personal" },
    { icon: FaGraduationCap, label: "Education" },
    { icon: FaBriefcase, label: "Experience" },
    { icon: FaEye, label: "Preview" },
  ];

  return (
    <div className="flex justify-between items-center mb-8 px-4 relative">
    
      <div 
        className="absolute top-5 h-1 bg-gray-200 w-full -z-10"
        style={{ transform: 'translateY(-50%)' }}
      >
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>

      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index + 1 === currentStep;
        const isCompleted = index + 1 < currentStep;

        return (
          <div
            key={index}
            className={`flex flex-col items-center ${
              isActive
                ? "text-blue-600"
                : isCompleted
                ? "text-green-500"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 transform ${
                isActive
                  ? "bg-blue-100 text-blue-600 scale-110 ring-4 ring-blue-50"
                  : isCompleted
                  ? "bg-green-100 text-green-500"
                  : "bg-gray-100"
              }`}
            >
              <Icon className="text-xl" />
            </div>
            <span className="text-sm font-medium whitespace-nowrap">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};

const MultiStepForm = ({ existingData, onSave, userEmail }) => {
  const initialData = existingData || {
    personal: { name: "", email: userEmail || "", contact: "" },
    education: { school: "", degree: "", graduationYear: "" },
    experience: { company: "", role: "", duration: "" },
    skills: [],
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
    }
  }, [existingData]);

  const nextStep = () => {
    setStep((prev) => prev + 1);
    toast.success('Progress saved!');
  };
  
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (section, data) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  const handleSave = async () => {
    try {
      await onSave(formData);
      toast.success('Resume saved successfully!');
    } catch (error) {
      toast.error('Failed to save resume');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <StepIndicator currentStep={step} />
        
        <div className="min-h-[400px]"> 
          {step === 1 && (
            <PersonalDetails
              data={formData.personal}
              onChange={(data) => handleChange("personal", data)}
            />
          )}
          {step === 2 && (
            <EducationForm
              data={formData.education}
              onChange={(data) => handleChange("education", data)}
            />
          )}
          {step === 3 && (
            <Experience
              data={formData.experience}
              skills={formData.skills}
              onChange={({ experience, skills }) => {
                handleChange("experience", experience);
                handleChange("skills", skills);
              }}
            />
          )}
          {step === 4 && <ResumePreview formData={formData} />}
        </div>

        <div className="mt-6 flex justify-between items-center pt-6 border-t">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300"
            >
              <FaArrowLeft className="mr-2" />
              Previous
            </button>
          ) : (
            <div />
          )}
          
          {step < 4 ? (
            <button
              onClick={nextStep}
              className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
            >
              Next
              <FaArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300"
            >
              Save Resume
              <FaSave className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
