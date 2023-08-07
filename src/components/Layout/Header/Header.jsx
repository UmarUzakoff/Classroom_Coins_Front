import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import logo from "../../../images/logo.png";
import me from "../../../images/me.jpg";
import {
  getAccessTokenFromLocalStorage,
  getRoleFromStorage,
} from "../../../utils/storage";
import axios from "axios";
import { FaXing } from "react-icons/fa";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const role = getRoleFromStorage();

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
      const response = await axios.get("http://13.51.198.185/userinfo", {
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
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-72 sm:w-96 lg:w-auto my-6 mx-auto max-w-2xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">My Profile</h3>
                  <button
                    onClick={handleModalClose}
                    className="text-gray-600 transition duration-300 rounded-full hover:bg-gray-500 hover:text-white p-2">
                    <FaXing />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-row gap-5 sm:gap-10 text-sm sm:text-xl">
                  <div className="flex flex-col text-start items-start gap-2 sm:gap-5 w-20">
                    <h5 className="font-bold">Name: </h5>
                    <h5 className="font-bold">Surname: </h5>
                    <h5 className="font-bold">Email: </h5>
                    <h5 className={`font-bold ${role === "admin" ? "hidden" : ""}`}>ClassName: </h5>
                    <h5 className={`font-bold ${role === "admin" ? "hidden" : ""}`}>Coins: </h5>
                  </div>
                  <div className="flex flex-col text-start items-start gap-2 sm:gap-5 ">
                    <span>{user.name}</span>
                    <span>{user.surname}</span>
                    <span>{user.email}</span>
                    <span className={`font-bold ${role === "admin" ? "hidden" : ""}`}>{className}</span>
                    <span className={`font-bold ${role === "admin" ? "hidden" : ""}`}>{user.coins}</span>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-orange bg-yellow rounded-xl font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleModalClose}>
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 justify-between items-stretch">
            <Link to={"/"} className="flex flex-shrink-0  items-center">
              <img className="h-8 w-auto" src={logo} alt="logo" />
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={
                      role === "admin"
                        ? me
                        : (user.name !== "Sevinch" && user.name !== "Aziza")
                        ? "https://whatsondisneyplus.com/wp-content/uploads/2021/06/luca-avatar-WODP.png"
                        : "https://img.freepik.com/premium-photo/cute-girl-3d-character-design-cartoon-girl-avatar_432516-5510.jpg?w=2000"
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item onClick={handleButtonClick}>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}>
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={"/settings"}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}>
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item className={`${role !== "admin" ? "hidden" : " "}`}>
                    {({ active }) => (
                      <Link
                        to={"/settings/addclassroom"}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
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
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-red-400"
                        )}>
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}
