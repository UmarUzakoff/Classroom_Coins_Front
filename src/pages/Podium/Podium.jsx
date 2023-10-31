import React, { useContext, useEffect, useState } from "react";
import { WinnersPodium } from "winner-podium";
import { ThemeApi } from "../../context/themeContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAccessTokenFromLocalStorage,
  getRoleFromStorage,
} from "../../utils/storage";
import { FaArrowLeft, FaDownload, FaMedal } from "react-icons/fa";
import { Button, ButtonGroup } from "@material-tailwind/react";
import BackBtn from "../../components/BackBtn/BackBtn";
import CertificateModal from "../../components/Modals/Certificate";
import gold_medal from "../../images/gold-medal.png";
import silver_medal from "../../images/silver-medal.png";
import bronze_medal from "../../images/bronze-medal.png";
import winnersData from "./podium.data";
import Confetti from "react-confetti";
import MemoriesCarousel from "./Carousel";

const Podium = () => {
  const role = getRoleFromStorage();

  const { theme } = useContext(ThemeApi);

  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();

  useEffect(() => {
    if (!token) {
      return navigate("/auth/login");
    }
  }, [navigate]);

  const { classroomid, month } = useParams();

  const winners = winnersData
    .find((classroom) => classroom.id == classroomid)
    .months.find((months) => months.monthNum == month);

  const memoriesFromThatMonth = winners.memories;

  const goldStudent = winners.topStudents.find(
    (students) => students.rank == 1
  );
  const silverStudent = winners.topStudents.find(
    (students) => students.rank == 2
  );
  const bronzeStudent = winners.topStudents.find(
    (students) => students.rank == 3
  );

  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(!showModal);

  const [certificate, setCertificate] = useState(false);

  const findCertificate = (type) => {
    if (type === "gold") {
      return setCertificate(goldStudent.certificate);
    } else if (type === "silver") {
      return setCertificate(silverStudent.certificate);
    } else if (type === "bronze") {
      return setCertificate(bronzeStudent.certificate);
    }
  };

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  let podiumWidth = 100;
  if (windowWidth > 400 && windowWidth < 700) {
    podiumWidth = 100;
  } else if (windowWidth > 700 && windowWidth < 1000) {
    podiumWidth = 150;
  } else if (windowWidth > 1000 && windowWidth < 1200) {
    podiumWidth = 180;
  } else if (windowWidth > 1200) {
    podiumWidth = 200;
  } else {
    podiumWidth = 100;
  }
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.download = "Certificate";
    link.href = url;
    link.click();
  };

  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponent(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="my-3 px-3">
      {showComponent && (
        <Confetti
          numberOfPieces={150}
          width={windowWidth}
          height={windowHeight}
          className="animate-fade- transition duration-500"
        />
      )}
      {showModal ? (
        <CertificateModal
          showModal={showModal}
          handleOpen={handleOpen}
          img={certificate}
        />
      ) : null}
      <div className="container flex justify-center flex-col gap-10">
        <div className="flex flex-row items-center sm:justify-start justify-between gap-5">
          <BackBtn />
          <div
            onClick={() => navigate(-1)}
            className={`${
              role === "admin" ? "" : "hidden"
            } cursor-pointer px-5 py-2.5 text-center relative rounded group text-white font-medium`}>
            <span
              className={`absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br ${
                theme == "dark"
                  ? "from-black to-gray-200"
                  : "from-gray-200 to-gray-100"
              }`}></span>
            <span
              className={`h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 ${
                theme == "dark"
                  ? "from-black to-gray-200"
                  : "from-gray-200 to-gray-800"
              }`}></span>
            <span
              className={`absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm ${
                theme == "dark"
                  ? "from-black to-gray-200"
                  : "from-gray-200 to-black"
              }`}></span>
            <span
              className={`absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br ${
                theme == "dark"
                  ? "from-black to-gray-500"
                  : "from-gray-400 to-gray-700"
              }`}></span>
            <span className="relative flex flex-row items-center gap-1">
              <FaArrowLeft /> Go back
            </span>
          </div>
        </div>
        <WinnersPodium
          options={{
            container: {
              style: {
                borderRadius: "1rem",
                boxShadow: `${
                  theme === "dark" ? "#f3f4f6" : "#121212"
                } 0px 5px 15px`,
              },
              className: "font-tilt text-dark font-bold",
            },
            podiumHeight: 70,
            podiumWidth: podiumWidth,
            backgroundColor: "rgb(255, 79, 40)",
            is3D: true,
            topViewHeight: 30,
            header: (
              <h1 className={`${theme === "dark" ? "text-grey" : "text-dark"}`}>
                Monthly Star Performers
              </h1>
            ),
            footer: (
              <div
                className={`${theme === "dark" ? "text-grey" : "text-dark"}`}>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center">
                    <img src={gold_medal} alt="gold_medal" />
                    {goldStudent.fullName}
                  </div>
                  <span className="text-xs ml-7 text-yellow-600">
                    {goldStudent.coins} coins
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center">
                    <img src={silver_medal} alt="silver_medal" />
                    {silverStudent.fullName}
                  </div>
                  <span className="text-xs ml-7 text-yellow-600">
                    {silverStudent.coins} coins
                  </span>
                </div>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row items-center">
                    <img src={bronze_medal} alt="bronze_medal" />
                    {bronzeStudent.fullName}
                  </div>
                  <span className="text-xs ml-7 text-yellow-600">
                    {bronzeStudent.coins} coins
                  </span>
                </div>
              </div>
            ),
            winners: {
              rank1: (
                <div className="flex justify-center flex-col items-center gap-1">
                  <img
                    src={goldStudent.avatar}
                    className="sm:h-24 sm:w-24 h-16 w-16 object-cover rounded-full border-double border-4 border-yellow-600 shadow-[0_20px_50px_rgba(255,_213,_0,_0.7)] animate-once animate-fade-down animate-delay-300"
                    alt="avatar"
                  />
                  <ButtonGroup
                    size="sm"
                    color={`${theme === "dark" ? "deep-orange" : "gray"}`}
                    variant="text"
                    className={`rounded-xl border z-50 ${
                      theme === "dark" ? "border-gray-700" : "border-orange"
                    } `}>
                    <Button
                      onClick={() => {
                        handleOpen();
                        findCertificate("gold");
                      }}>
                      <FaMedal
                        className={`${theme === "dark" ? null : "text-dark"}`}
                      />
                    </Button>
                    <Button
                      onClick={() => handleDownload(goldStudent.certificate)}>
                      <FaDownload
                        className={`${theme === "dark" ? null : "text-dark"}`}
                      />
                    </Button>
                  </ButtonGroup>
                </div>
              ),
              rank2: (
                <div className="flex justify-center flex-col items-center gap-1">
                  <img
                    src={silverStudent.avatar}
                    className="sm:h-24 sm:w-24 h-16 w-16 object-cover rounded-full border-double border-4 border-blue-600 shadow-[0_20px_50px_rgba(0,_208,_204,_0.7)] animate-once animate-fade-down animate-delay-500"
                    alt="avatar"
                  />
                  <ButtonGroup
                    size="sm"
                    color={`${theme === "dark" ? "deep-orange" : "gray"}`}
                    variant="text"
                    className={`rounded-xl border z-50 ${
                      theme === "dark" ? "border-gray-700" : "border-orange"
                    } `}>
                    <Button
                      onClick={() => {
                        handleOpen();
                        findCertificate("silver");
                      }}>
                      <FaMedal
                        className={`${theme === "dark" ? null : "text-dark"}`}
                      />
                    </Button>
                    <Button
                      onClick={() => handleDownload(silverStudent.certificate)}>
                      <FaDownload
                        className={`${theme === "dark" ? null : "text-dark"}`}
                      />
                    </Button>
                  </ButtonGroup>
                </div>
              ),
              rank3: (
                <div className="flex justify-center flex-col items-center gap-1">
                  <img
                    src={bronzeStudent.avatar}
                    className="sm:h-24 sm:w-24 h-16 w-16 object-cover rounded-full border-double border-4 border-yellow-900 shadow-[0_20px_50px_rgba(255,_132,_0,_0.7)] animate-once animate-fade-down animate-delay-700"
                    alt="avatar"
                  />
                  <ButtonGroup
                    size="sm"
                    color={`${theme === "dark" ? "deep-orange" : "gray"}`}
                    variant="text"
                    className={`rounded-xl border z-50 ${
                      theme === "dark" ? "border-gray-700" : "border-orange"
                    } `}>
                    <Button
                      onClick={() => {
                        handleOpen();
                        findCertificate("bronze");
                      }}>
                      <FaMedal
                        className={`${theme === "dark" ? null : "text-dark"}`}
                      />
                    </Button>
                    <Button
                      onClick={() => handleDownload(bronzeStudent.certificate)}>
                      <FaDownload
                        className={`${theme === "dark" ? null : "text-dark"}`}
                      />
                    </Button>
                  </ButtonGroup>
                </div>
              ),
            },
          }}
        />
        {memoriesFromThatMonth.length ? (
          <MemoriesCarousel images={memoriesFromThatMonth} />
        ) : null}
      </div>
    </section>
  );
};

export default Podium;
