import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getAccessTokenFromLocalStorage,
  getRoleFromStorage,
  setAccessTokenToLocalStorage,
} from "../../utils/storage";
import { FaHome } from "react-icons/fa";
import API from "../../utils/api";
import toastify from "../../utils/toastify";
import { ThemeApi } from "../../context/themeContext";

const Settings = () => {
  const { theme } = useContext(ThemeApi);

  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();

  const role = getRoleFromStorage();

  useEffect(() => {
    if (!token) {
      return navigate("/auth/login");
    }
  }, [navigate]);

  const [previousEmail, setPreviousEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e, method) => {
    e.preventDefault();
    let body;
    if (method === "email") {
      body = {
        previousEmail,
        newEmail,
      };
    } else {
      body = {
        previousPassword,
        newPassword,
      };
    }
    try {
      const response = await axios.put(`${API}/userinfo/edit/${method}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        if (method === "email") {
          setNewEmail("");
          setPreviousEmail("");
          setAccessTokenToLocalStorage(response.data.token);
        } else {
          setNewPassword("");
          setPreviousPassword("");
        }
        let messageFromBackend = response.data.message;
        toastify(messageFromBackend, "success");
      }
    } catch (error) {
      toastify(error.response.data.message, "error");
    }
  };

  return (
    <section className={`${theme === "dark" ? "bg-dark" : "bg-grey"}`}>
      <Link
        to={`${role === "admin" ? "/dashboard" : "/"}`}
        className="px-5 py-2.5 mt-8 mx-10 text-center relative rounded group text-white font-medium inline-block">
        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-black to-gray-200"></span>
        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-black to-gray-200"></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-black to-gray-200"></span>
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-gray-500 from-black"></span>
        <span className="relative flex flex-row items-center gap-1">
          <FaHome /> {role === "admin" ? "Dashboard" : "Home"}
        </span>
      </Link>
      <section className="flex flex-col justify-center gap-10 md:gap-2 md:flex-row md:justify-around items-center font-rem mt-20">
        <div>
          <h2 className="text-center font-bold text-xl text-gray-600">
            Change your email address
          </h2>
          <form
            className={`${
              theme === "dark" ? "bg-gray-900" : "bg-grey"
            } flex flex-col rounded shadow-lg p-12 mt-12`}
            onSubmit={(e) => handleSubmit(e, "email")}>
            <label
              className={`${
                theme === "dark" ? "text-grey" : "text-dark"
              } font-semibold text-xs`}
              htmlFor="usernameField">
              Previous Email
            </label>
            <input
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
              type="email"
              autoComplete="true"
              value={previousEmail}
              onChange={(e) => setPreviousEmail(e.target.value)}
            />
            <label
              className={`${
                theme === "dark" ? "text-grey" : "text-dark"
              } font-semibold text-xs mt-3`}
              htmlFor="passwordField">
              New Email
            </label>
            <input
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
              type="email"
              autoComplete="true"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button
              type={"submit"}
              className="px-5 py-2.5 mt-8 text-center relative rounded group text-black font-medium inline-block">
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-orange"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-gray-300 to-orange"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-orange"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-gray-300 from-orange"></span>
              <span className="relative">Reset Email</span>
            </button>
          </form>
        </div>
        <div>
          <hr className="md:hidden mb-10 border-2" />
          <h2 className="text-center font-bold text-xl text-gray-600">
            Change your password
          </h2>
          <form
            className={`${
              theme === "dark" ? "bg-gray-900" : "bg-grey"
            } flex flex-col rounded shadow-lg p-12 mt-12`}
            onSubmit={(e) => handleSubmit(e, "password")}>
            <label
              className={`${
                theme === "dark" ? "text-grey" : "text-dark"
              } font-semibold text-xs`}
              htmlFor="usernameField">
              Previous Password
            </label>
            <input
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
              type="password"
              autoComplete="true"
              value={previousPassword}
              onChange={(e) => setPreviousPassword(e.target.value)}
            />
            <label
              className={`${
                theme === "dark" ? "text-grey" : "text-dark"
              } font-semibold text-xs mt-3`}
              htmlFor="passwordField">
              New Password
            </label>
            <input
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
              type="password"
              autoComplete="true"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type={"submit"}
              className="px-5 py-2.5 mt-8 text-center relative rounded group text-black font-medium inline-block">
              <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-orange"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-gray-300 to-orange"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-orange"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-gray-300 from-orange"></span>
              <span className="relative">Reset Password</span>
            </button>
          </form>
        </div>
      </section>
    </section>
  );
};

export default Settings;
