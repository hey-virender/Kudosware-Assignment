import React, { useRef, useState } from "react";
import axios from "../api/axios";
import { z } from "zod";
import userSchema from "../validation/userSchema";

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const [message, setMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    highestQualification: "",
    desiredJobRole: "",
    experience: "0",
    expectedCTC: "",
    address: "",
    githubProfile: "",
    linkedinProfile: "",
    portfolioWebsite: "",
    coverLetter: "",
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToValidate = {
      ...formData,
      resume: selectedFile,
    };

    try {
      // Validate data using zod schema
      userSchema.parse(dataToValidate);

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      data.append("resume", selectedFile);
      setIsUploading(true);

      const response = await axios.post("/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Your profile has been registered");
      setIsUploading(false);
      setTimeout(() => {
        setMessage(null); // Clear the message after 3 seconds
      }, 3000);

      // Reset file input field
      fileInputRef.current.value = null;

      setSelectedFile(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        highestQualification: "",
        desiredJobRole: "",
        experience: "",
        expectedCTC: "",
        address: "",
        githubProfile: "",
        linkedinProfile: "",
        portfolioWebsite: "",
        coverLetter: "",
      });

      setErrorMsg(""); // Clear any previous errors
    } catch (error) {
      setIsUploading(false);
      if (error instanceof z.ZodError) {
        // Check if it's a validation error
        if (error.errors.length > 0) {
          setErrorMsg(error.errors[0].message);

          setTimeout(() => {
            setErrorMsg(""); // Clear the error message after 2 seconds
          }, 2000);
        }
      } else {
        setErrorMsg(error.response.data.error);
      }
    }
  };

  return (
    <div className="relative text-sm grid lg:text-lg">
      {errorMsg && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 px-2 py-1 z-50 rounded-lg bg-red-500 text-white font-medium  text-center mb-4">
          {errorMsg}
        </div>
      )}
      {message && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 px-2 py-1 z-50 rounded-lg bg-blue-500 text-slate-900 font-bold  text-center mb-4">
          {message}
        </div>
      )}
      {isUploading && (
        <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-80 flex justify-center items-center text-3xl animate-pulse">
          Uploading...
        </div>
      )}
      <form
        className="flex flex-col px-2 gap-y-2 overflow-y-scroll scrollbar-hidden h-[90vh] sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4 sm:mt-2 lg:grid-cols-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name:</label>
          <input
            className="border-2 h-8 rounded-md"
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input
            className="border-2 h-8 rounded-md"
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phone">Phone:</label>
          <input
            className="border-2 h-8 rounded-md"
            type="text"
            id="phone"
            name="phone"
            onChange={handleInputChange}
            value={formData.phone}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="resume">
            Upload Your Resume (PDF or docx format only):
          </label>
          <input
            className=" h-8 rounded-md lg:h-12 lg:py-1 lg:px-2"
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.docx"
            ref={fileInputRef}
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="address">Address:</label>
          <textarea
            className="border-2 w-3/4 h-24 rounded-md lg:w-full lg:h-32"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="highestQualification">Highest Qualification:</label>
          <select
            className="border-2 h-8 rounded-md"
            id="highestQualification"
            name="highestQualification"
            value={formData.highestQualification}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select your qualification
            </option>
            <option value="High School">High School</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="desiredJobRole">Desired Job Role:</label>
          <select
            className="border-2 h-8 rounded-md"
            id="desiredJobRole"
            name="desiredJobRole"
            value={formData.desiredJobRole}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select your job role
            </option>
            <option value="Software Developer">Software Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Project Manager">Project Manager</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="experience">Experience (in years):</label>
          <input
            className="border-2 h-8 rounded-md"
            type="number"
            id="experience"
            name="experience"
            onChange={handleInputChange}
            value={formData.experience}
            required
            min="0"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="expectedCTC">Expected CTC (In Indian Rupees):</label>
          <input
            className="border-2 h-8 rounded-md"
            type="text"
            id="expectedCTC"
            name="expectedCTC"
            onChange={handleInputChange}
            value={formData.expectedCTC}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="linkedinProfile">LinkedIn Profile (optional):</label>
          <input
            className="border-2 h-8 rounded-md"
            type="text"
            id="linkedinProfile"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="portfolioWebsite">
            Portfolio Website (optional):
          </label>
          <input
            className="border-2 h-8 rounded-md"
            type="text"
            id="portfolioWebsite"
            name="portfolioWebsite"
            value={formData.portfolioWebsite}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="coverLetter">Cover Letter (optional):</label>
          <textarea
            className="border-2 h-24 rounded-md"
            id="coverLetter"
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-start sm:col-span-2">
          <input
            className="mt-1 mr-2 sm:h-4 sm:w-4 sm:mt-1 lg:w-6 lg:h-6"
            type="checkbox"
            required
          />{" "}
          <p className="text-xs sm:text-sm lg:text-xl">
            I agree to the terms and conditions and allow connections via email.
          </p>
        </div>
        <div className="flex flex-col mb-4 sm:col-span-2  sm:flex-row sm:justify-center lg:col-span-3">
          <button
            className="bg-blue-700 py-2 rounded-md text-white sm:w-2/4"
            type="submit"
          >
            Sign Up{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
