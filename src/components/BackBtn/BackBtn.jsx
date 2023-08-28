import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getRoleFromStorage } from "../../utils/storage";

const BackBtn = () => {
  const role = getRoleFromStorage();
  return (
    <div>
      <Link
        to={`${role === "admin" ? "/dashboard" : "/"}`}
        className="px-5 py-2.5 text-center relative rounded group text-white font-medium inline-block">
        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-black to-gray-200"></span>
        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-black to-gray-200"></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-black to-gray-200"></span>
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-gray-500 from-black"></span>
        <span className="relative flex flex-row items-center gap-1">
          <FaHome /> {role === "admin" ? "Dashboard" : "Home"}
        </span>
      </Link>
    </div>
  );
};

export default BackBtn;
