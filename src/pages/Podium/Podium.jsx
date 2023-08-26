import React, { useContext } from "react";
import { WinnersPodium } from "winner-podium";
import { ThemeApi } from "../../context/themeContext";
import gold_medal from "../../images/gold-medal.png";
import silver_medal from "../../images/silver-medal.png";
import bronze_medal from "../../images/bronze-medal.png";

const Podium = () => {
  const { theme } = useContext(ThemeApi);

  const windowWidth = window.innerWidth;
  let podiumWidth;
  if (windowWidth > 400 && windowWidth < 700) {
    podiumWidth = 100;
  } else if (windowWidth > 700 && windowWidth < 1000) {
    podiumWidth = 150;
  } else if (windowWidth > 1000 && windowWidth < 1200) {
    podiumWidth = 180;
  } else if (windowWidth > 1200) {
    podiumWidth = 200;
  } else {
    podiumWidth = 200;
  }
  return (
    <section className="container my-3 flex justify-center">
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
            <div className={`${theme === "dark" ? "text-grey" : "text-dark"}`}>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                  <img src={gold_medal} alt="gold_medal" />
                  Sevinch Sayfutdinova
                </div>
                <span className="text-xs ml-7 text-yellow-600">215 coins</span>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                  <img src={silver_medal} alt="silver_medal" />
                  Javohir Murodov
                </div>
                <span className="text-xs ml-7 text-yellow-600">214 coins</span>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center">
                  <img src={bronze_medal} alt="bronze_medal" />
                  Fayoziddin Appakxodjayev
                </div>
                <span className="text-xs ml-7 text-yellow-600">186 coins</span>
              </div>
            </div>
          ),
          winners: {
            rank1: (
              <img
                src="https://i.pinimg.com/564x/f7/0d/6c/f70d6c4271126184ce5cce40a53611a9.jpg"
                className="sm:h-24 sm:w-24 h-16 w-16 object-cover rounded-full"
                alt="avatar"
              />
            ),
            rank2: (
              <img
                src="https://i.pinimg.com/474x/88/b3/e4/88b3e42479fb2d3440681af9ef9ab95b.jpg"
                className="sm:h-24 sm:w-24 h-16 w-16 object-cover rounded-full"
                alt="avatar"
              />
            ),
            rank3: (
              <img
                src="https://img.freepik.com/premium-photo/very-cute-kid-caracter-animation-pixar-style_950002-73964.jpg"
                className="sm:h-24 sm:w-24 h-16 w-16 object-cover rounded-full"
                alt="avatar"
              />
            ),
          },
        }}
      />
    </section>
  );
};

export default Podium;
