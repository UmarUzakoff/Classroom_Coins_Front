import { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ThemeApi } from "../../../context/themeContext";
import {
  getAccessTokenFromLocalStorage,
  getRoleFromStorage,
} from "../../../utils/storage";
import API from "../../../utils/api";
import { Menu, Transition } from "@headlessui/react";
import logo from "../../../images/logo.png";
import darklogo from "../../../images/darklogo.png";
import me from "../../../images/me.jpg";
import moon from "../../../images/moon.svg";
import sun from "../../../images/sun.svg";
import StudentProfileModal from "../../Modals/StudentProfile";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const role = getRoleFromStorage();

  const { theme, toggleTheme } = useContext(ThemeApi);

  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const [user, setUser] = useState([]);
  const [className, setClassName] = useState("");

  const token = getAccessTokenFromLocalStorage();
  const fetchData = async (token) => {
    try {
      const response = await axios.get(`${API}/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.verifiedUser;
      const className = response.data.className;
      setUser(data);
      setClassName(className);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(token);
  }, []);
  
  return (
    <header
      className={`${
        theme === "dark" ? "bg-dark text-grey" : "bg-grey text-dark"
      }`}>
      {showModal ? (
        <StudentProfileModal
          handleModal={handleModalClose}
          name={user.name}
          surname={user.surname}
          email={user.email}
          classname={className}
          coins={user.coins}
          method={"my"}
        />
      ) : null}
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 justify-between items-stretch">
            <Link to={"/"} className="flex flex-shrink-0  items-center">
              <img
                className={`${
                  theme === "dark" ? "h-10" : "h-8"
                } w-auto rounded-bl-lg rounded-tr-lg`}
                src={theme === "dark" ? darklogo : logo}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex items-center">
            <div
              className={`rounded-full absolute inset-y-0 right-12 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0`}
              onClick={toggleTheme}>
              <img
                className="cursor-pointer"
                src={theme === "dark" ? moon : sun}
                alt={theme === "dark" ? "moon" : "sun"}
              />
            </div>
            <div
              className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0`}>
              {/* Profile dropdown */}
              <Menu as="div" className={`relative ml-3`}>
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        role === "admin"
                          ? me
                          : user.name === "Sevinch"
                          ? "https://img.freepik.com/premium-photo/cute-girl-3d-character-design-cartoon-girl-avatar_432516-5510.jpg?w=2000"
                          : user.name === "Mubina"
                          ? "https://img.freepik.com/premium-photo/cute-girl-3d-character-design-cartoon-girl-avatar_432516-5510.jpg?w=2000"
                          : "https://whatsondisneyplus.com/wp-content/uploads/2021/06/luca-avatar-WODP.png"
                      }
                      alt="avatar"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items
                    className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md ${
                      theme === "dark" ? "bg-gray-900" : "bg-grey"
                    } py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                    <Menu.Item onClick={handleButtonClick}>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active
                              ? `${
                                  theme === "dark"
                                    ? "bg-gray-800"
                                    : "bg-gray-200"
                                }`
                              : "",
                            `block px-4 py-2 text-sm ${
                              theme === "dark" ? "text-grey" : "text-gray-700"
                            }`
                          )}>
                          Your Profile
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to={"/settings"}
                          className={classNames(
                            active
                              ? `${
                                  theme === "dark"
                                    ? "bg-gray-800"
                                    : "bg-gray-200"
                                }`
                              : "",
                            `block px-4 py-2 text-sm ${
                              theme === "dark" ? "text-grey" : "text-gray-700"
                            }`
                          )}>
                          Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item
                      className={`${role !== "admin" ? "hidden" : " "}`}>
                      {({ active }) => (
                        <Link
                          to={"/settings/addclassroom"}
                          className={classNames(
                            active
                              ? `${
                                  theme === "dark"
                                    ? "bg-gray-800"
                                    : "bg-gray-200"
                                }`
                              : "",
                            `block px-4 py-2 text-sm ${
                              theme === "dark" ? "text-grey" : "text-gray-700"
                            }`
                          )}>
                          Add Classroom
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                      }}>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active
                              ? `${
                                  theme === "dark"
                                    ? "bg-gray-800"
                                    : "bg-gray-200"
                                }`
                              : "",
                            `block px-4 py-2 text-sm text-red-500`
                          )}>
                          Sign out
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
