import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="font-caveat text-center">
      <h1 className="text-2xl font-exo2 font-bold text-center w-40 mx-auto animate-pulse duration-1000 sm:text-5xl sm:w-full sm:mt-12">
        Welcome to Kudosware!
      </h1>
      <p className="text-md mt-1 mb-4 sm:text-xl">
        a platform for job seekers to find and apply for jobs.
      </p>
      <p className="font-exo2 sm:mt-10 sm:text-lg">
        Please sign up or log in to continue.
      </p>
      <button
        onClick={() => {
          navigate("/signup");
        }}
        className="bg-blue-700 font-exo2 py-1 px-4 mt-3 rounded-lg animate-bounce duration-1000 sm:mt-10 sm:py-4 sm:px-8 sm:text-lg sm:font-semibold"
      >
        Sign Up
      </button>
    </div>
  );
};

export default LandingPage;
