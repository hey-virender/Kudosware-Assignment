import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between py-3 px-5">
      <div className="text-xl font-bold sm:text-2xl lg:text-4xl">Hirect</div>
      <button
        onClick={() => {
          currentPath == "/" ? navigate("/signup") : navigate("/");
        }}
        className="text-black bg-white font-bold px-2 rounded sm:px-3 sm:py-1 lg:text-xl lg:px-5 lg:py-2 lg:font-extrabold"
      >
        {currentPath == "/" ? "Sign Up" : "Home"}
      </button>
    </div>
  );
};

export default Header;
