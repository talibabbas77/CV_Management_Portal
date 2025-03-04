"use client";
import { useState, useEffect, useCallback } from "react";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative mb-4">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="text-gray-400" />
    </div>
    <input
      {...props}
      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 ${
        props.readOnly
          ? "bg-gray-50 cursor-not-allowed border-gray-200"
          : "border-gray-300 hover:border-gray-400"
      }`}
    />
  </div>
);

const PersonalDetails = ({ data, onChange, userEmail }) => {
  const [localData, setLocalData] = useState({
    name: data?.name || "",
    email: userEmail || data?.email || "",
    contact: data?.contact || "",
  });

  // Update email when userEmail changes
  useEffect(() => {
    if (userEmail && userEmail !== localData.email) {
      setLocalData((prev) => ({ ...prev, email: userEmail }));
    }
  }, [userEmail]);

  const handleInputChange = useCallback(
    (e) => {
      const newData = { ...localData, [e.target.name]: e.target.value };
      setLocalData(newData);
      onChange(newData);
    },
    [localData, onChange]
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white text-black rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Personal Details
        </h2>

        <div className="space-y-4">
          <InputField
            icon={FaUser}
            type="text"
            name="name"
            value={localData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
          />

          <div className="relative">
            <InputField
              icon={FaEnvelope}
              type="email"
              name="email"
              value={localData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
            />
           
          </div>

          <InputField
            icon={FaPhone}
            type="text"
            name="contact"
            value={localData.contact}
            onChange={handleInputChange}
            placeholder="Contact Number"
            required
          />
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>* All fields are required!</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
