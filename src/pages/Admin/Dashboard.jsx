import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAccessTokenFromLocalStorage,
  getRoleFromStorage,
} from "../../utils/storage";
import coin from "../../images/coin.png";
import { FaTrashAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();
  const admin = getRoleFromStorage();

  useEffect(() => {
    if (!token || admin !== "admin") {
      return navigate("/auth/login");
    }
  }, [navigate]);

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://13.51.198.185/classrooms", {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="bg-white font-rem container px-3 h-72 sm:h-[380px] mb-12">
      <hr />
      <div className="flex flex-col justify-center items-center gap-2 mt-10">
        {data.map(({ id, class_name, coins }, index) => (
          <Link
            to={`/dashboard/classroom/${id}`}
            key={id}
            className="my-1 rounded-xl w-full shadow-xl hover:bg-gray-200 active:bg-gray-300 transition duration-300 flex flex-row justify-between items-center px-5 py-2 cursor-pointer gap-5">
            <div className="flex flex-row items-center gap-3">
              <span>{index + 1}.</span>
              <h1 className="animate-text bg-gradient-to-r from-black via-gray-400 to-orange bg-clip-text text-transparent text-xl sm:text-2xl font-black text-center">
                {class_name}
              </h1>
            </div>
            <h2 className="text-lg font-bold text-black flex flex-row items-center">
              Total coins: &nbsp;{" "}
              <span className="text-yellow-600 flex flex-row gap-1 items-center">
                {coins} <img src={coin} className="w-5 h-5" alt="coin" />
              </span>
            </h2>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
