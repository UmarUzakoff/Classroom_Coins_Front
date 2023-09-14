import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getAccessTokenFromLocalStorage,
  getRoleFromStorage,
} from "../../utils/storage";
import API from "../../utils/api";
import toastify from "../../utils/toastify";
import { ThemeApi } from "../../context/themeContext";
import BackBtn from "../../components/BackBtn/BackBtn";

const AddClassroom = () => {
  const { theme } = useContext(ThemeApi);

  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();

  const role = getRoleFromStorage();

  useEffect(() => {
    if (!token || role !== "admin") {
      return navigate("/auth/login");
    }
  }, [navigate]);

  const [className, setClassName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/classroom`,
        {
          class_name: className,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setClassName("");
        let messageFromBackend = response.data.message;
        toastify(messageFromBackend, "success");
      }
    } catch (error) {
      toastify(error.response.data.message, "error");
    }
  };

  return (
    <div className="container mb-24 sm:mb-14">
      <div className="mx-10 my-4">
        <BackBtn />
      </div>
      <section className="mt-24 flex flex-col justify-center gap-10 md:gap-2 md:flex-row md:justify-around items-center font-rem my-10">
        <div>
          <h2 className="text-center font-bold text-xl text-gray-600">
            Add a new classroom
          </h2>
          <form
            className={`${
              theme === "dark" ? "bg-gray-900" : "bg-grey"
            } flex flex-col rounded shadow-lg p-12 mt-5`}
            onSubmit={handleSubmit}>
            <label
              className={`${
                theme === "dark" ? "text-grey" : "text-dark"
              } font-semibold text-xs`}
              htmlFor="passwordField">
              Class Name
            </label>
            <input
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
              type="text"
              autoComplete="true"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <button
              type={"submit"}
              className="px-5 py-2.5 mt-8 text-center relative rounded group text-black font-medium inline-block">
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-orange"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-gray-300 to-orange"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-orange"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-gray-300 from-orange"></span>
              <span className="relative">Add</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddClassroom;
