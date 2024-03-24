import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@material-tailwind/react";
import { ThemeApi } from "../../context/themeContext";
import { useNavigate } from "react-router-dom";
import toastify from "../../utils/toastify";
import {
  getAccessTokenFromLocalStorage,
  getRoleFromStorage,
} from "../../utils/storage";

const HTMLComparisonTool = () => {
  const { theme } = useContext(ThemeApi);

  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();
  const role = getRoleFromStorage();

  useEffect(() => {
    if (!token || role !== "admin") {
      return navigate("/auth/login");
    }
  }, [navigate]);

  const [html1, setHtml1] = useState("");
  const [html2, setHtml2] = useState("");
  const [result, setResult] = useState("");

  const compareHTML = () => {
    if (!html1 || !html2) {
      setResult("");
      return toastify("Please fill in both textareas", "error");
    }

    const classList1 = extractClassNames(html1);
    const classList2 = extractClassNames(html2);

    if (classList1.length === 0 || classList2.length === 0) {
      setResult("");
      return toastify("Both HTML inputs must have class names", "error");
    }

    const similarityPercentage = calculateSimilarity(classList1, classList2);

    setResult(`Similarity: ${similarityPercentage}%`);
  };

  const extractClassNames = (html) => {
    const classRegex = /\bclass="([^"]*)"/g;
    const classes = html.match(classRegex);
    if (!classes) return [];
    return classes.map((cls) => cls.split('"')[1]);
  };

  const calculateSimilarity = (arr1, arr2) => {
    const totalClasses = arr1.length + arr2.length;
    const commonClasses = arr1.filter((cls) => arr2.includes(cls));
    return ((commonClasses.length * 2) / totalClasses) * 100;
  };

  return (
    <div className="container font-assistant mx-auto py-8 px-4 flex justify-center flex-col gap-5">
      <h1
        className={`text-3xl font-assistant ${
          theme === "dark" ? "text-orange" : "text-orange"
        } font-semibold text-center mb-6`}>
        HTML Comparison Tool
      </h1>
      <div className="w-full">
        <Textarea
          rows={8}
          color="deep-orange"
          className={`${theme === "dark" ? "text-white" : "text-black"}`}
          variant="outlined"
          label="Paste HTML content 1 here"
          value={html1}
          onChange={(e) => setHtml1(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Textarea
          rows={8}
          color="deep-orange"
          className={`${theme === "dark" ? "text-white" : "text-black"}`}
          variant="outlined"
          label="Paste HTML content 2 here"
          value={html2}
          onChange={(e) => setHtml2(e.target.value)}
        />
      </div>
      <button
        onClick={compareHTML}
        className="px-5 py-2.5 mt-8 text-center relative rounded group text-black font-medium inline-block">
        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-gray-300 to-orange"></span>
        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-gray-300 to-orange"></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-300 to-orange"></span>
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-gray-300 from-orange"></span>
        <span className="relative">Compare</span>
      </button>
      <div id="result" className="mt-6 text-lg text-white">
        {result}
      </div>
    </div>
  );
};

export default HTMLComparisonTool;
