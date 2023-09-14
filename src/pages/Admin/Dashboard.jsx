import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  getAccessTokenFromLocalStorage,
  getRoleFromStorage,
} from "../../utils/storage";
import coin from "../../images/coin.png";
import API from "../../utils/api";
import { ThemeApi } from "../../context/themeContext";

const Dashboard = () => {
  const { theme } = useContext(ThemeApi);

  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();
  const admin = getRoleFromStorage();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!token && admin !== "admin") {
      return navigate("/auth/login");
    }
    if (token && admin !== "admin") {
      return navigate("/");
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/classrooms`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main
      className={`${
        theme === "dark" ? "bg-dark" : "bg-grey"
      } font-rem px-3 h-[65vh]`}>
      <div className="container">
        <hr />
        <div className="flex flex-col justify-center items-center gap-2 my-10">
          {data.map(({ id, class_name, coins }, index) => (
            <Link
              to={`/dashboard/classroom/${id}`}
              key={id}
              className={`my-1 rounded-xl w-full shadow-xl ${
                theme === "dark"
                  ? "hover:bg-gray-700 active:bg-gray-800 bg-gray-900"
                  : "hover:bg-gray-200 active:bg-gray-300"
              } transition duration-300 flex flex-row justify-between items-center px-5 py-2 cursor-pointer gap-5`}>
              <div className="flex flex-row items-center gap-3">
                <span
                  className={`${theme === "dark" ? "text-grey" : "text-dark"}`}>
                  {index + 1}.
                </span>
                <h1 className="animate-text bg-gradient-to-r from-gray-700 via-gray-400 to-orange bg-clip-text text-transparent text-xl sm:text-2xl font-black text-center">
                  {class_name}
                </h1>
              </div>
              <h2
                className={`text-lg font-bold ${
                  theme === "dark" ? "text-grey" : "text-dark"
                } flex flex-row items-center`}>
                Total coins: &nbsp;{" "}
                <span className="text-yellow-600 flex flex-row gap-1 items-center">
                  {coins} <img src={coin} className="w-5 h-5" alt="coin" />
                </span>
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export const MemoizedDashboard = React.memo(Dashboard);

export default MemoizedDashboard;
