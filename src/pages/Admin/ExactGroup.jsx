import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useClassroomData } from "../../context/classContext";
import DelModal from "../../components/Modals/DelModal";
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
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import { ThemeApi } from "../../context/themeContext";
import AddStudentModal from "../../components/Modals/AddStudent";
import StudentProfileModal from "../../components/Modals/StudentProfile";
import BackBtn from "../../components/BackBtn/BackBtn";
import { PodiumBtn } from "./PodiumBtn";
import { Flip, LightSpeed } from "react-reveal";

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

  const isLoading = classroomData[3];

  const setIsLoading = classroomData[4];

  ///

  useEffect(() => {
    setIsLoading(true);
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
    { id: 5, isOpen: false },
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
        handleModalToggle(5);
        fetchAllClassroomData(id, token);
      }
    } catch (error) {
      toastify(error.response.data.message, "error");
    }
  };

  const [userToDelete, setUserToDelete] = useState([]);

  const getIdToDeleteStudent = (id) => {
    const fetchUserinfoToDelete = async () => {
      try {
        const response = await axios.get(`${API}/student/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.findStudent;
        setUserToDelete(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserinfoToDelete();
    const fullName = userToDelete.name + " " + userToDelete.surname;
    return {
      id: userToDelete.id,
      username: fullName,
    };
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
          <AddStudentModal handleModal={handleModalToggle} />
        ) : null}
        {modals[1].isOpen ? (
          <StudentProfileModal
            handleModal={handleModalToggle}
            name={user.name}
            surname={user.surname}
            email={user.email}
            classname={className}
            coins={user.coins}
          />
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
        {modals[4].isOpen ? (
          <DelModal
            deleteClick={deleteStudent}
            id={getIdToDeleteStudent().id}
            closeClick={() => handleModalToggle(5)}
            name={getIdToDeleteStudent().username}
            method={"deleteStudent"}
          />
        ) : null}
        <hr />
        <div className="flex flex-row justify-between items-center gap-1 mt-5">
          <BackBtn />
          <button
            onClick={() => handleModalToggle(1)}
            className="ml-5 sm:px-3.5 sm:py-2.5 px-2 py-1 relative rounded-full group font-medium text-white inline-block">
            <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-gray-600"></span>
            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-gray-300 to-gray-600"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-gray-600"></span>
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-gray-600 from-gray-300"></span>
            <span className="relative flex flex-row items-center gap-1">
              Add new student
            </span>
          </button>
        </div>
        <div className="my-7 flex flex-col lg:flex-row justify-between items-center px-5">
          <div className="flex flex-row justify-between lg:justify-start lg:gap-20 items-center w-full">
            <h1 className="animate-text bg-gradient-to-r from-gray-700 via-gray-400 to-orange bg-clip-text text-transparent text-xl lg:text-2xl font-black text-center">
              {classroomProperties.class_name}
            </h1>
            <h2
              className={`text-lg font-bold ${
                theme === "dark" ? "text-white" : "text-black"
              } flex flex-row items-center`}>
              Total coins: &nbsp;{" "}
              <span className="text-yellow-600 flex flex-row gap-1 items-center">
                {classroomProperties.coins}{" "}
                <img
                  src={coin}
                  className="w-5 h-5 animate-rotate-y animate-infinite"
                  alt="coin"
                />
              </span>
            </h2>
          </div>
          <div className="flex flex-row items-center justify-between">
            <PodiumBtn
              classroomId={id}
              classname={classroomProperties.class_name}
            />
            <div className="flex flex-row items-center gap-5">
              <button
                onClick={() => handleModalToggle(4)}
                className="ml-5 px-2 py-1 relative rounded-full group font-medium text-white inline-block">
                <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-gray-400 to-gray-700"></span>
                <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-gray-400 to-gray-700"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm to-gray-400 from-gray-700"></span>
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-gray-400 from-gray-700"></span>
                <span className="relative flex flex-row items-center gap-1 text-sm">
                  Reset
                </span>
              </button>
              <button
                onClick={() => handleModalToggle(3)}
                className="px-2 py-1 relative rounded-full group font-medium text-white inline-block">
                <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-red-300 to-red-600"></span>
                <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-red-300 to-red-600"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-red-300 to-red-600"></span>
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-red-300 from-red-600"></span>
                <span className="relative flex flex-row items-center gap-1 text-sm">
                  <FaTrashAlt className="text-sm" /> Delete
                </span>
              </button>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full h-80 text-center flex justify-center items-center">
            <Spinner
              color="deep-orange"
              className="h-16 w-16 text-gray-900/50 flex items-center justify-center"
            />
          </div>
        ) : (
          <Card className="w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300">
            <table className="w-full min-w-max table-auto text-center">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className={`border-b border-blue-gray-100 ${
                        theme === "dark"
                          ? "bg-blue-gray-200"
                          : "bg-blue-gray-50"
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
                      <Flip left cascade text key={id}>
                        <tr
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
                                onClick={() =>
                                  sendCoinsToBackend(id, 1, "plus")
                                }
                                className="px-3 py-2.5 relative rounded-full group font-medium text-white inline-block">
                                <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-orange"></span>
                                <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-gray-300 to-orange"></span>
                                <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-orange"></span>
                                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-gray-from-gray-300"></span>
                                <span className="relative">+1</span>
                              </button>
                              <button
                                onClick={() =>
                                  sendCoinsToBackend(id, 5, "plus")
                                }
                                className="px-3 py-2.5 relative rounded-full group font-medium text-white inline-block">
                                <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-orange"></span>
                                <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-gray-300 to-orange"></span>
                                <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-orange"></span>
                                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-gray-from-gray-300"></span>
                                <span className="relative">+5</span>
                              </button>
                              <button
                                onClick={() =>
                                  sendCoinsToBackend(id, 1, "minus")
                                }
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
                              onClick={() => {
                                getIdToDeleteStudent(id);
                                handleModalToggle(5);
                              }}>
                              <FaTrash className="text-red-600 transition duration-300 hover:pt-[1px] hover:opacity-80 cursor-pointer" />
                            </Typography>
                          </td>
                        </tr>
                      </Flip>
                    );
                  }
                )}
              </tbody>
            </table>
          </Card>
        )}
      </section>
    </main>
  );
};

export const MemoizedExactGroup = React.memo(ExactGroup);

export default MemoizedExactGroup;
