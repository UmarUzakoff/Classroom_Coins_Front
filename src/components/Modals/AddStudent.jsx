import React, { useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ThemeApi } from "../../context/themeContext";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import toastify from "../../utils/toastify";
import { useClassroomData } from "../../context/classContext";
import { FaXing } from "react-icons/fa";
import API from "../../utils/api";

const AddStudentModal = ({handleModal}) => {
  const { theme } = useContext(ThemeApi);

  const { id } = useParams();

  const token = getAccessTokenFromLocalStorage();

  /// Handling context

  const classroomData = useClassroomData();

  const fetchAllClassroomData = classroomData[2];

  ///

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const addNewStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/student`,
        {
          classroom_id: id,
          name,
          email,
          surname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        let messageFromBackend = response.data.message;
        toastify(messageFromBackend, "success");
        handleModal(1);
        fetchAllClassroomData(id, token);
      }
    } catch (error) {
      toastify(error.response.data.message, "error");
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-80 sm:w-96 lg:w-auto my-6 mx-auto max-w-2xl">
          {/*content*/}
          <div
            className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full ${
              theme === "dark" ? "bg-gray-900" : "bg-grey"
            } outline-none focus:outline-none`}>
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h2 className="text-center font-bold text-xl text-gray-600">
                New Student
              </h2>
              <button
                onClick={() => handleModal(1)}
                className="text-gray-600 transition duration-300 rounded-full hover:bg-gray-500 hover:text-white p-2">
                <FaXing />
              </button>
            </div>
            {/*body*/}
            <div className="relative">
              <form
                className={`flex flex-col justify-center items-center ${
                  theme === "dark" ? "bg-gray-900" : "bg-grey"
                } rounded shadow-lg p-3 sm:p-12`}
                onSubmit={addNewStudent}>
                <label
                  className={`${
                    theme === "dark" ? "text-grey" : "text-dark"
                  } font-semibold text-xs mt-3`}
                  htmlFor="passwordField">
                  Name
                </label>
                <input
                  className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
                  type="text"
                  autoComplete="true"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label
                  className={`${
                    theme === "dark" ? "text-grey" : "text-dark"
                  } font-semibold text-xs mt-3`}
                  htmlFor="passwordField">
                  Surname
                </label>
                <input
                  className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
                  type="text"
                  autoComplete="true"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
                <label
                  className={`${
                    theme === "dark" ? "text-grey" : "text-dark"
                  } font-semibold text-xs mt-3`}
                  htmlFor="passwordField">
                  Email
                </label>
                <input
                  className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
                  type="email"
                  autoComplete="true"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type={"submit"}
                  className="px-5 w-full py-2.5 mt-8 text-center relative rounded group text-black font-medium inline-block">
                  <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-orange"></span>
                  <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-gray-300 to-orange"></span>
                  <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-orange"></span>
                  <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-gray-300 from-orange"></span>
                  <span className="relative">Add</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddStudentModal;