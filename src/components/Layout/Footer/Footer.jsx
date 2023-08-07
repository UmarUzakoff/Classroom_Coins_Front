import React from "react";
import { FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../images/logo.png";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0">
            <img src={logo} className="h-8 mr-3" alt="Logo" />
          </a>
          <ul className="flex flex-row gap-1 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
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
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
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
