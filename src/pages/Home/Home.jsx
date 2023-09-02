import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Card, Spinner, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {
  getAccessTokenFromLocalStorage,
  getRoleFromStorage,
} from "../../utils/storage";
import coin from "../../images/coin.png";
import gold_medal from "../../images/gold-medal.png";
import silver_medal from "../../images/silver-medal.png";
import bronze_medal from "../../images/bronze-medal.png";
import API from "../../utils/api";
import { ThemeApi } from "../../context/themeContext";
import { PodiumBtn } from "../Admin/PodiumBtn";
import { Flip } from "react-reveal";

const Home = () => {
  const { theme } = useContext(ThemeApi);

  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();

  useEffect(() => {
    if (!token) {
      return navigate("/auth/login");
    }
  }, [navigate]);

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/student/class/room`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.findClass;
      setData(data);
      const sorterData = response.data.studentsOfThatClass.sort(
        (a, b) => b.coins - a.coins
      );
      setStudents(sorterData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [user, setUser] = useState([]);

  const userinfo = async (token) => {
    try {
      const response = await axios.get(`${API}/userinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.verifiedUser;
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    userinfo(token);
  }, []);
  
  const element = document.getElementById(user.id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const TABLE_HEAD = ["№", "Name", "Surname", "Coins"];
  return (
    <main
      className={`${
        theme === "dark" ? "bg-dark text-grey" : "text-dark bg-grey"
      }`}>
      <div className="container">
        <hr />
        <div className="my-5 flex font-rem flex-row flex-wrap sm:flex-nowrap justify-center gap-x-10 sm:justify-between items-center px-5">
          <h1 className="animate-text bg-gradient-to-r from-gray-700 via-gray-400 to-orange bg-clip-text text-transparent text-3xl xl:text-5xl font-black text-center">
            {data.class_name}
          </h1>
          <h2
            className={`text-lg font-bold ${
              theme === "dark" ? "text-grey" : "text-dark"
            } flex flex-row items-stretch`}>
            Total&nbsp;coins:
            <span className="text-yellow-600 flex flex-row gap-1 items-center">
              &nbsp;{data.coins}{" "}
              <img
                src={coin}
                className="w-5 h-5 animate-rotate-y animate-infinite"
                alt="coin"
              />
            </span>
          </h2>
          <PodiumBtn classroomId={data.id} classname={data.class_name} />
        </div>
        {isLoading ? (
          <div className="w-full h-60 sm:h-96 text-center flex justify-center items-center">
            <Spinner
              color="deep-orange"
              className="h-16 w-16 text-gray-900/50 flex items-center justify-center"
            />
          </div>
        ) : (
          <Card className="w-full h-full text-center overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-300">
            <table className="w-full min-w-max table-auto text-center ">
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
                        className="font-bold text-lg font-rem flex justify-center leading-none opacity-70">
                        {head === "Coins" ? (
                          <img src={coin} className="w-7 h-7" alt="coin" />
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
                    <Flip left cascade text key={id}>
                      <tr
                        id={id}
                        className={`
                    ${
                      theme === "dark"
                        ? `${
                            user.name === name ? "bg-gray-700" : "bg-gray-900"
                          }`
                        : `${user.name === name ? "bg-gray-400" : "bg-grey"}`
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
                            variant="small"
                            color="blue-gray"
                            className={`font-normal font-rem group transition duration-300 cursor-pointer ${
                              theme === "dark" ? "text-white" : null
                            }`}>
                            {name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className={`font-normal font-rem group transition duration-300 cursor-pointer ${
                              theme === "dark" ? "text-white" : null
                            }`}>
                            {surname}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className={`font-normal font-rem group transition duration-300 cursor-pointer ${
                              theme === "dark" ? "text-white" : null
                            }`}>
                            {coins}
                          </Typography>
                        </td>
                      </tr>
                    </Flip>
                  );
                })}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </main>
  );
};

export default Home;
