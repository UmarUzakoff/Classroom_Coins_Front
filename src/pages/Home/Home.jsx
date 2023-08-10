import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";
import coin from "../../images/coin.png";
import gold_medal from "../../images/gold-medal.png";
import silver_medal from "../../images/silver-medal.png";
import bronze_medal from "../../images/bronze-medal.png";

const Home = () => {
  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();

  useEffect(() => {
    if (!token) {
      return navigate("/auth/login");
    }
  }, [navigate]);

  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apiv.classroomcoins.uz/student/class/room",
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

  const TABLE_HEAD = ["№", "Name", "Surname", "Coins"];
  return (
    <main className="bg-white container">
      <hr />
      <div className="my-7 flex font-rem flex-row justify-between items-center px-5">
        <h1 className="animate-text bg-gradient-to-r from-black via-gray-400 to-orange bg-clip-text text-transparent text-3xl sm:text-5xl font-black text-center">
          {data.class_name}
        </h1>
        <h2 className="text-lg font-bold text-black flex flex-row items-center">
          Total coins: &nbsp;{" "}
          <span className="text-yellow-600 flex flex-row gap-1 items-center">
            {data.coins} <img src={coin} className="w-5 h-5 animate-spin animate-rotate-y animate-infinite" alt="coin" />
          </span>
        </h2>
      </div>
      <Card className="w-full h-full overflow-scroll mb-10">
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
                      variant="small"
                      color="blue-gray"
                      className="font-normal font-rem ">
                      {name}
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </main>
  );
};

export default Home;
