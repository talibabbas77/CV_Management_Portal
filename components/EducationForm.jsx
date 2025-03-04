"use client";

import { useState, useEffect, useCallback } from "react";
import { FaSchool, FaGraduationCap, FaCalendarAlt } from "react-icons/fa";

const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative mb-4">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="text-gray-400" />
    </div>
    <input
      {...props}
      className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 border-gray-300 hover:border-gray-400"
    />
  </div>
);

const EducationForm = ({ data, onChange }) => {
  const [localData, setLocalData] = useState({
    school: data?.school || "",
    degree: data?.degree || "",
    graduationYear: data?.graduationYear || "",
  });


  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(localData)) {
      setLocalData({
        school: data?.school || "",
        degree: data?.degree || "",
        graduationYear: data?.graduationYear || "",
      });
    }
  }, [data]);


  const handleInputChange = useCallback(
    (e) => {
      const updatedData = { ...localData, [e.target.name]: e.target.value };
      setLocalData(updatedData);
      onChange(updatedData);
    },
    [localData, onChange]
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white text-black rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Education Details
        </h2>

        <div className="space-y-4">
          <InputField
            icon={FaSchool}
            type="text"
            name="school"
            value={localData.school}
            onChange={handleInputChange}
            placeholder="School/University Name"
            required
          />

          <InputField
            icon={FaGraduationCap}
            type="text"
            name="degree"
            value={localData.degree}
            onChange={handleInputChange}
            placeholder="Degree/Course"
            required
          />

          <InputField
            icon={FaCalendarAlt}
            type="text"
            name="graduationYear"
            value={localData.graduationYear}
            onChange={handleInputChange}
            placeholder="Graduation Year"
            required
          />
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>* All fields are required</p>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
