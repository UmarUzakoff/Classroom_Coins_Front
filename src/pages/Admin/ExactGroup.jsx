import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAccessTokenFromLocalStorage,
  getRoleFromStorage,
} from "../../utils/storage";
import coin from "../../images/coin.png";
import gold_medal from "../../images/gold-medal.png";
import silver_medal from "../../images/silver-medal.png";
import bronze_medal from "../../images/bronze-medal.png";
import { FaHome, FaTrash, FaTrashAlt, FaXing } from "react-icons/fa";

const Dashboard = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();
  const admin = getRoleFromStorage();

  useEffect(() => {
    if (!token || admin !== "admin") {
      return navigate("/auth/login");
    }
  }, [navigate]);

  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://apiv.classroomcoins.uz/classroom/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.findClass;
      setData(data);
      const sorterData = response.data.studentsOfThatClass.sort(
        (a, b) => b.coins - a.coins
      );
      setStudents(sorterData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let notifySuccess = (note) => toast.success(note);
  let notifyError = (note) => toast.error(note);

  let message = (note, type) => {
    if (type === "success") {
      notifySuccess(note);
    } else {
      notifyError(note);
    }
  };

  const sendCoinsToBackend = async (id, coins) => {
    try {
      await axios.post(
        `https://apiv.classroomcoins.uz/coins/plus/student/${id}`,
        {
          coins,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      message(error.response.data.message, "error");
    }
  };

  const sendCoinsToBackendForSubtracting = async (id, coins) => {
    try {
      await axios.post(
        `https://apiv.classroomcoins.uz/coins/minus/student/${id}`,
        {
          coins,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      message(error.response.data.message, "error");
    }
  };

  const handlePlusOneClick = (id) => {
    const coins = 1;
    sendCoinsToBackend(id, coins);
    setTimeout(() => {
      fetchData();
    }, 500);
  };

  const handlePlusFiveClick = (id) => {
    const coins = 5;
    sendCoinsToBackend(id, coins);
    setTimeout(() => {
      fetchData();
    }, 500);
  };

  const handleMinusOneClick = (id) => {
    const coins = 1;
    sendCoinsToBackendForSubtracting(id, coins);
    setTimeout(() => {
      fetchData();
    }, 500);
  };

  const resetCoins = async () => {
    try {
      const response = await axios.put(
        `https://apiv.classroomcoins.uz/classroom/addcoins/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        let messageFromBackend = response.data.message;
        message(messageFromBackend, "success");
        setTimeout(() => {
          fetchData();
        }, 500);
      }
    } catch (error) {
      message(error.response.data.message, "error");
    }
  };

  const [user, setUser] = useState([]);
  const [className, setClassName] = useState("");

  const fetchUserinfo = async (id) => {
    try {
      const response = await axios.get(
        `https://apiv.classroomcoins.uz/student/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.findStudent;
      const className = response.data.className;
      setUser(data);
      setClassName(className);
    } catch (error) {
      console.log(error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleButtonClick2 = () => {
    setShowModal2(true);
  };

  const handleModalClose2 = () => {
    setShowModal2(false);
  };

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const addNewStudent = async () => {
    try {
      const response = await axios.post(
        `https://apiv.classroomcoins.uz/student`,
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
        message(messageFromBackend, "success");
        setTimeout(() => {
          fetchData();
        }, 2000);
      }
    } catch (error) {
      message(error.response.data.message, "error");
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(
        `https://apiv.classroomcoins.uz/student/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        let messageFromBackend = response.data.message;
        message(messageFromBackend, "success");
        setTimeout(() => {
          fetchData();
        }, 500);
      }
    } catch (error) {
      message(error.response.data.message, "error");
    }
  };

  const handleDeleteClick = (id) => {
    deleteStudent(id);
    setTimeout(() => {
      fetchData();
    }, 500);
  };

  const deleteClassroom = async () => {
    try {
      const response = await axios.delete(
        `https://apiv.classroomcoins.uz/classroom/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        let messageFromBackend = response.data.message;
        message(messageFromBackend, "success");
        navigate("/dashboard");
      }
    } catch (error) {
      message(error.response.data.message, "error");
    }
  };

  const TABLE_HEAD = ["№", "Name", "Surname", "Coins", "Grading", "Delete"];
  return (
    <main className="bg-white font-rem container px-2">
      {showModal2 ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-2xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Student Profile</h3>
                  <button
                    onClick={handleModalClose2}
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
                    onClick={handleModalClose2}>
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-80 sm:w-96 lg:w-auto my-6 mx-auto max-w-2xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h2 className="text-center font-bold text-xl text-gray-600">
                    Add a new classroom
                  </h2>
                  <button
                    onClick={handleModalClose}
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
          onClick={handleButtonClick}
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
        <h1 className="animate-text bg-gradient-to-r from-black via-gray-400 to-orange bg-clip-text text-transparent text-xl sm:text-2xl font-black text-center">
          {data.class_name}
        </h1>
        <h2 className="text-lg font-bold text-black flex flex-row items-center">
          Total coins: &nbsp;{" "}
          <span className="text-yellow-600 flex flex-row gap-1 items-center">
            {data.coins} <img src={coin} className="w-5 h-5" alt="coin" />
          </span>
        </h2>
        <div className="flex flex-row items-center gap-3">
          <button
            onClick={resetCoins}
            className="ml-5 md:px-3.5 md:py-2.5 px-2 py-1 relative rounded-full group font-medium text-white inline-block">
            <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-gray-600"></span>
            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-gray-300 to-gray-600"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-gray-600"></span>
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-gray-600 from-gray-300"></span>
            <span className="relative">Reset</span>
          </button>
          <button
            onClick={deleteClassroom}
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
      <Card className="w-full h-full mb-10 overflow-scroll">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold font-rem text-lg flex justify-center leading-none opacity-70">
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
            {students.map(({ id, name, surname, coins }, index) => {
              const isLast = index === students.length - 1;
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
                <tr key={id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal font-rem flex justify-center">
                      {order}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      onClick={() => {
                        fetchUserinfo(id);
                        handleButtonClick2();
                      }}
                      variant="small"
                      color="blue-gray"
                      className="font-normal font-rem group transition duration-300 cursor-pointer">
                      {name}
                      <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-orange"></span>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal font-rem">
                      {surname}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal font-rem">
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
                        onClick={() => handlePlusOneClick(id)}
                        className="px-3 py-2.5 relative rounded-full group font-medium text-white inline-block">
                        <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-orange"></span>
                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-gray-300 to-orange"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-orange"></span>
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-gray-from-gray-300"></span>
                        <span className="relative">+1</span>
                      </button>
                      <button
                        onClick={() => handlePlusFiveClick(id)}
                        className="px-3 py-2.5 relative rounded-full group font-medium text-white inline-block">
                        <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-orange"></span>
                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-gray-300 to-orange"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-orange"></span>
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-gray-from-gray-300"></span>
                        <span className="relative">+5</span>
                      </button>
                      <button
                        onClick={() => handleMinusOneClick(id)}
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
                      onClick={() => handleDeleteClick(id)}>
                      <FaTrash className="text-red-600 transition duration-300 hover:pt-[1px] hover:opacity-80 cursor-pointer" />
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </main>
  );
};

export default Dashboard;
