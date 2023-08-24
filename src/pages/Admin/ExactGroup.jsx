import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useClassroomData } from "../../context/classContext";
import DelModal from "./DelModal";
import {
  getAccessTokenFromLocalStorage,
  getRoleFromStorage,
} from "../../utils/storage";
import API from "../../utils/api";
import toastify from "../../utils/toastify";
import coin from "../../images/coin.png";
import gold_medal from "../../images/gold-medal.png";
import silver_medal from "../../images/silver-medal.png";
import bronze_medal from "../../images/bronze-medal.png";
import { FaHome, FaTrash, FaTrashAlt, FaXing } from "react-icons/fa";
import { ThemeApi } from "../../context/themeContext";

const ExactGroup = () => {
  const { theme } = useContext(ThemeApi);

  const { id } = useParams();

  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();
  const admin = getRoleFromStorage();

  /// Handling context

  const classroomData = useClassroomData();

  const classroomProperties = classroomData[0];

  const studentsOfTheClassroom = classroomData[1];

  const fetchAllClassroomData = classroomData[2];

  ///

  useEffect(() => {
    fetchAllClassroomData(id, token);
  }, []);

  useEffect(() => {
    if (!token || admin !== "admin") {
      return navigate("/auth/login");
    }
  }, [navigate]);

  const sendCoinsToBackend = async (student_id, coins, method) => {
    try {
      await axios.post(
        `${API}/coins/${method}/student/${student_id}`,
        {
          coins,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAllClassroomData(id, token);
    } catch (error) {
      toastify(error.response.data.message, "error");
    }
  };

  const resetCoins = async () => {
    try {
      const response = await axios.put(
        `${API}/classroom/addcoins/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        let messageFromBackend = response.data.message;
        toastify(messageFromBackend, "success");
        fetchAllClassroomData(id, token);
      }
    } catch (error) {
      toastify(error.response.data.message, "error");
    }
  };

  const [user, setUser] = useState([]);
  const [className, setClassName] = useState("");

  const fetchUserinfo = async (id) => {
    try {
      const response = await axios.get(`${API}/student/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.findStudent;
      const className = response.data.className;
      setUser(data);
      setClassName(className);
    } catch (error) {
      console.log(error);
    }
  };

  const [modals, setModals] = useState([
    { id: 1, isOpen: false },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
    { id: 4, isOpen: false },
  ]);

  // Function to handle modal open/close
  const handleModalToggle = (modalId) => {
    setModals((prevModals) => {
      return prevModals.map((modal) => {
        if (modal.id === modalId) {
          return { ...modal, isOpen: !modal.isOpen };
        }
        return modal;
      });
    });
  };

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const addNewStudent = async () => {
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
        fetchAllClassroomData(id, token);
      }
    } catch (error) {
      toastify(error.response.data.message, "error");
    }
  };

  const deleteStudent = async (student_id) => {
    try {
      const response = await axios.delete(`${API}/student/${student_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        let messageFromBackend = response.data.message;
        toastify(messageFromBackend, "success");
        fetchAllClassroomData(id, token);
      }
    } catch (error) {
      toastify(error.response.data.message, "error");
    }
  };

  const deleteClassroom = async () => {
    try {
      const response = await axios.delete(`${API}/classroom/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        let messageFromBackend = response.data.message;
        toastify(messageFromBackend, "success");
        navigate("/dashboard");
      }
    } catch (error) {
      toastify(error.response.data.message, "error");
    }
  };

  const TABLE_HEAD = ["№", "Name", "Surname", "Coins", "Grading", "Delete"];

  return (
    <main className={`${theme === "dark" ? "bg-dark" : "bg-grey"} pb-7`}>
      <section className={`font-rem container px-2`}>
        {modals[0].isOpen ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-80 sm:w-96 lg:w-auto my-6 mx-auto max-w-2xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h2 className="text-center font-bold text-xl text-gray-600">
                      New Student
                    </h2>
                    <button
                      onClick={() => handleModalToggle(1)}
                      className="text-gray-600 transition duration-300 rounded-full hover:bg-gray-500 hover:text-white p-2">
                      <FaXing />
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative">
                    <form
                      className="flex flex-col justify-center items-center bg-white rounded shadow-lg p-3 sm:p-12"
                      onSubmit={addNewStudent}>
                      <label
                        className="font-semibold text-xs mt-3"
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
                        className="font-semibold text-xs mt-3"
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
                        className="font-semibold text-xs mt-3"
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
        ) : null}
        {modals[1].isOpen ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-full my-6 mx-auto max-w-2xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Student Profile</h3>
                    <button
                      onClick={() => handleModalToggle(2)}
                      className="text-gray-600 transition duration-300 rounded-full hover:bg-gray-500 hover:text-white p-2">
                      <FaXing />
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex flex-row gap-5 sm:gap-20 text-sm sm:text-xl">
                    <div className="flex flex-col text-start items-start gap-2 sm:gap-5 w-20">
                      <h5 className="font-bold">Name: </h5>
                      <h5 className="font-bold">Surname: </h5>
                      <h5 className="font-bold">Email: </h5>
                      <h5 className="font-bold">ClassName: </h5>
                      <h5 className="font-bold">Coins: </h5>
                    </div>
                    <div className="flex flex-col text-start items-start gap-2 sm:gap-5 ">
                      <span>{user.name}</span>
                      <span>{user.surname}</span>
                      <span>{user.email}</span>
                      <span>{className}</span>
                      <span>{user.coins}</span>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-orange shadow-xl border border-gray-400 active:bg-orange active:text-white rounded-xl font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-300"
                      type="button"
                      onClick={() => handleModalToggle(2)}>
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        {modals[2].isOpen ? (
          <DelModal
            deleteClick={deleteClassroom}
            closeClick={() => handleModalToggle(3)}
            name={classroomProperties.class_name}
            method={"classroom"}
          />
        ) : null}
        {modals[3].isOpen ? (
          <DelModal
            deleteClick={resetCoins}
            closeClick={() => handleModalToggle(4)}
            name={classroomProperties.class_name}
            method={"reset"}
          />
        ) : null}
        <hr />
        <div className="flex flex-row justify-between items-center gap-1">
          <Link
            to={"/dashboard"}
            className="ml-5 mt-5 sm:px-3.5 sm:py-2.5 px-2 py-1 relative rounded-full group font-medium text-white inline-block">
            <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-gray-600"></span>
            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-gray-300 to-gray-600"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-gray-600"></span>
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-gray-600 from-gray-300"></span>
            <span className="relative flex flex-row items-center gap-1">
              <FaHome /> Dashboard
            </span>
          </Link>
          <button
            onClick={() => handleModalToggle(1)}
            className="ml-5 mt-5 sm:px-3.5 sm:py-2.5 px-2 py-1 relative rounded-full group font-medium text-white inline-block">
            <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-gray-600"></span>
            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-gray-300 to-gray-600"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-gray-600"></span>
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-gray-600 from-gray-300"></span>
            <span className="relative flex flex-row items-center gap-1">
              Add new student
            </span>
          </button>
        </div>
        <div className="my-7 flex flex-col md:flex-row justify-between items-center px-5">
          <h1 className="animate-text bg-gradient-to-r from-gray-700 via-gray-400 to-orange bg-clip-text text-transparent text-xl sm:text-2xl font-black text-center">
            {classroomProperties.class_name}
          </h1>
          <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-black"} flex flex-row items-center`}>
            Total coins: &nbsp;{" "}
            <span className="text-yellow-600 flex flex-row gap-1 items-center">
              {classroomProperties.coins}{" "}
              <img src={coin} className="w-5 h-5" alt="coin" />
            </span>
          </h2>
          <div className="flex flex-row items-center gap-3">
            <button
              onClick={() => handleModalToggle(4)}
              className="ml-5 md:px-3.5 md:py-2.5 px-2 py-1 relative rounded-full group font-medium text-white inline-block">
              <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-gray-600"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-gray-300 to-gray-600"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-gray-600"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-gray-600 from-gray-300"></span>
              <span className="relative">Reset</span>
            </button>
            <button
              onClick={() => handleModalToggle(3)}
              className="md:px-3 md:py-2.5 px-2 py-1 relative rounded-full group font-medium text-white inline-block">
              <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-red-300 to-red-600"></span>
              <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-red-300 to-red-600"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-red-300 to-red-600"></span>
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-red-300 from-red-600"></span>
              <span className="relative flex flex-row items-center gap-1 text-sm sm:text-md">
                <FaTrashAlt /> Delete Classroom
              </span>
            </button>
          </div>
        </div>
        <Card className="w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className={`border-b border-blue-gray-100 ${
                      theme === "dark" ? "bg-blue-gray-200" : "bg-blue-gray-50"
                    }  p-4`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold font-rem text-lg flex justify-center leading-none">
                      {head === "Coins" ? (
                        <img src={coin} className="w-7 h-7" alt="coin" />
                      ) : head === "Delete" ? (
                        <FaTrashAlt className="text-red-600" />
                      ) : (
                        head
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {studentsOfTheClassroom.map(
                ({ id, name, surname, coins }, index) => {
                  const isLast = index === studentsOfTheClassroom.length - 1;
                  let order;
                  if (index + 1 === 1) {
                    order = (
                      <img
                        src={gold_medal}
                        className="animate-wiggle-more animate-infinite animate-ease-out"
                        alt="gold_medal"
                      />
                    );
                  } else if (index + 1 === 2) {
                    order = <img src={silver_medal} alt="silver_medal" />;
                  } else if (index + 1 === 3) {
                    order = <img src={bronze_medal} alt="bronze_medal" />;
                  } else {
                    order = index + 1;
                  }
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      key={id}
                      className={`${
                        theme === "dark" ? "bg-gray-900" : "bg-grey"
                      } `}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`${
                            theme === "dark" ? "text-white" : ""
                          } font-normal transition duration-300 font-rem flex justify-center`}>
                          {order}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          onClick={() => {
                            fetchUserinfo(id);
                            handleModalToggle(2);
                          }}
                          variant="small"
                          color="blue-gray"
                          className={`font-normal font-rem group transition duration-300 cursor-pointer ${
                            theme === "dark" ? "text-white" : null
                          }`}>
                          {name}
                          <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-orange"></span>
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`font-normal font-rem transition duration-300 ${
                            theme === "dark" ? "text-white" : null
                          }`}>
                          {surname}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={`font-normal font-rem transition duration-300 ${
                            theme === "dark" ? "text-white" : null
                          }`}>
                          {coins}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue"
                          className="font-medium font-rem flex flex-row items-center gap-3 justify-center">
                          <button
                            onClick={() => sendCoinsToBackend(id, 1, "plus")}
                            className="px-3 py-2.5 relative rounded-full group font-medium text-white inline-block">
                            <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-orange"></span>
                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-gray-300 to-orange"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-orange"></span>
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-gray-from-gray-300"></span>
                            <span className="relative">+1</span>
                          </button>
                          <button
                            onClick={() => sendCoinsToBackend(id, 5, "plus")}
                            className="px-3 py-2.5 relative rounded-full group font-medium text-white inline-block">
                            <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-orange"></span>
                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-gray-300 to-orange"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-orange"></span>
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-gray-from-gray-300"></span>
                            <span className="relative">+5</span>
                          </button>
                          <button
                            onClick={() => sendCoinsToBackend(id, 1, "minus")}
                            className="ml-5 px-3.5 py-2.5 relative rounded-full group font-medium text-white inline-block">
                            <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-red-300 to-red-600"></span>
                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-red-300 to-red-600"></span>
                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-red-300 to-red-600"></span>
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-red-600 from-red-300"></span>
                            <span className="relative">-1</span>
                          </button>
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal font-rem flex justify-center"
                          onClick={() => deleteStudent(id)}>
                          <FaTrash className="text-red-600 transition duration-300 hover:pt-[1px] hover:opacity-80 cursor-pointer" />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      </section>
    </main>
  );
};

export const MemoizedExactGroup = React.memo(ExactGroup);

export default MemoizedExactGroup;
