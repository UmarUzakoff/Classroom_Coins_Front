import React from "react";
import "./loader.css";
import { Flip } from "react-reveal";

export const Loader = ({enteringText}) => {
  return (
    <div className="container flex justify-center flex-col items-center h-[70vh]">
      <div className="loader"></div>
      <Flip left text>
        <h1 className="mt-5 animate-text bg-gradient-to-r from-gray-700 via-gray-400 to-orange bg-clip-text text-transparent text-3xl xl:text-5xl font-rem font-black text-center">
          {enteringText}
        </h1>
      </Flip>
    </div>
  );
};
