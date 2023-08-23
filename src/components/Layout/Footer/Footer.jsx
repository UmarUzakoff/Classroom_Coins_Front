import React, { useContext } from "react";
import { FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ThemeApi } from "../../../context/themeContext";
import logo from "../../../images/logo.png";
import darklogo from "../../../images/darklogo.png";

const Footer = () => {
  const { theme } = useContext(ThemeApi);
  return (
    <footer
      className={`${
        theme === "dark"
          ? "bg-dark text-grey"
          : "text-dark bg-grey m-4 rounded-lg shadow"
      }`}>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex justify-between items-center flex-row">
          <a href="/" className="flex items-center mb-4 sm:mb-0">
            <img
              className={`${theme === "dark" ? "h-10" : "h-8"} mr-3 rounded-bl-lg rounded-tr-lg`}
              src={theme === "dark" ? darklogo : logo}
              alt="Logo"
            />
          </a>
          <ul className="flex flex-row gap-1 items-center text-sm font-medium text-gray-500">
            <li>
              <a
                href="https://t.me/coddycamp"
                className="mr-4 hover:underline md:mr-6 ">
                <FaTelegram className="w-7 h-7 animate-pulse transition duration-300 hover:text-orange hover:pt-1" />
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=udlj9LmilfE"
                className="mr-4 hover:underline md:mr-6">
                <FaYoutube className="w-7 h-7 animate-pulse transition duration-300 hover:text-orange hover:pt-1" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/coddycamp_it_akademiya/"
                className="mr-4 hover:underline md:mr-6 ">
                <FaInstagram className="w-7 h-7 animate-pulse transition duration-300 hover:text-orange hover:pt-1" />
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 text-center">
          © 2023{" "}
          <Link
            to={"https://dcamp.io/coddycamp"}
            target="_blank"
            className="hover:opacity-80 text-orange">
            Coddy Camp IT Academy™.
          </Link>
          <br className="sm:hidden" />
          &nbsp;All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
