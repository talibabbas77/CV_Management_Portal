"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FaBriefcase,
  FaUserTie,
  FaClock,
  FaTools,
  FaTimes,
} from "react-icons/fa";

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

const SkillTag = ({ skill, onRemove }) => (
  <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 mb-2">
    {skill}
    <button
      onClick={onRemove}
      className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
    >
      <FaTimes size={12} />
    </button>
  </div>
);

const Experience = ({
  data = { company: "", role: "", duration: "" },
  skills = [],
  onChange,
}) => {
  const [localExp, setLocalExp] = useState(data);
  const [localSkills, setLocalSkills] = useState(skills);
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(localExp)) {
      setLocalExp(data);
    }
    if (JSON.stringify(skills) !== JSON.stringify(localSkills)) {
      setLocalSkills(skills);
    }
  }, [data, skills]);

  const handleInputChange = useCallback(
    (e) => {
      const updatedExp = { ...localExp, [e.target.name]: e.target.value };
      setLocalExp(updatedExp);
      onChange({
        experience: updatedExp,
        skills: localSkills,
      });
    },
    [localExp, localSkills, onChange]
  );

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !localSkills.includes(newSkill)) {
        const updatedSkills = [...localSkills, newSkill];
        setLocalSkills(updatedSkills);
        setSkillInput("");
        onChange({
          experience: localExp,
          skills: updatedSkills,
        });
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = localSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setLocalSkills(updatedSkills);
    onChange({
      experience: localExp,
      skills: updatedSkills,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white text-black rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Experience & Skills
        </h2>

        <div className="space-y-4">
          <InputField
            icon={FaBriefcase}
            type="text"
            name="company"
            value={localExp.company}
            onChange={handleInputChange}
            placeholder="Company Name"
            required
          />

          <InputField
            icon={FaUserTie}
            type="text"
            name="role"
            value={localExp.role}
            onChange={handleInputChange}
            placeholder="Job Role/Position"
            required
          />

          <InputField
            icon={FaClock}
            type="text"
            name="duration"
            value={localExp.duration}
            onChange={handleInputChange}
            placeholder="Duration (e.g., 2020-2022)"
            required
          />

          <div className="space-y-2">
            <InputField
              icon={FaTools}
              type="text"
              name="skills"
              value={skillInput}
              onChange={handleSkillInputChange}
              onKeyDown={handleSkillInputKeyDown}
              placeholder="Type a skill and press Enter or comma"
            />
            <div className="flex flex-wrap mt-2">
              {localSkills.map((skill, index) => (
                <SkillTag
                  key={index}
                  skill={skill}
                  onRemove={() => removeSkill(skill)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>* All fields are required</p>
          <p>* Press Enter or comma to add a skill</p>
          <p>* Click on a skill tag to remove it</p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
