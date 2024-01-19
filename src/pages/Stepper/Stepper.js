import React from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { FaHtml5, FaCss3, FaJs, FaGithub, FaReact } from "react-icons/fa";
import { SiScratch, SiTailwindcss } from "react-icons/si";

const StudyStepper = ({ step }) => {
  const [activeStep] = React.useState(step);

  return (
    <div className="w-full sm:pt-8 sm:pb-12 py-6 sm:px-8 px-2">
      <Stepper activeStep={activeStep} activeLineClassName="bg-orange">
        <Step
          className={`sm:h-10 sm:w-10 w-8 h-8 ${
            activeStep >= 0 ? "!bg-orange" : "gray"
          }`}>
          <SiScratch className="sm:h-5 sm:w-5 w-4 h-4" />
          <div className="absolute -bottom-[2rem] w-max text-center hidden sm:flex">
            <Typography
              className="font-rem"
              variant="h6"
              color={activeStep >= 0 ? "amber" : "gray"}>
              Scratch
            </Typography>
          </div>
        </Step>
        <Step
          className={`sm:h-10 sm:w-10 w-8 h-8 ${
            activeStep >= 1 ? "!bg-orange " : "gray"
          }`}>
          <FaHtml5 className="sm:h-5 sm:w-5 w-4 h-4" />
          <div className="absolute -bottom-[2rem] w-max text-center hidden sm:flex">
            <Typography
              className="font-rem"
              variant="h6"
              color={activeStep >= 1 ? "amber" : "gray"}>
              HTML
            </Typography>
          </div>
        </Step>
        <Step
          className={`sm:h-10 sm:w-10 w-8 h-8 ${
            activeStep >= 2 ? "!bg-orange" : "gray"
          }`}>
          <FaCss3 className="sm:h-5 sm:w-5 w-4 h-4" />
          <div className="absolute -bottom-[2rem] w-max text-center hidden sm:flex">
            <Typography
              className="font-rem"
              variant="h6"
              color={activeStep >= 2 ? "amber" : "gray"}>
              CSS
            </Typography>
          </div>
        </Step>
        <Step
          className={`sm:h-10 sm:w-10 w-8 h-8 ${
            activeStep >= 3 ? "!bg-orange" : "gray"
          }`}>
          <SiTailwindcss className="sm:h-5 sm:w-5 w-4 h-4" />
          <div className="absolute -bottom-[2rem] w-max text-center hidden sm:flex">
            <Typography
              className="font-rem"
              variant="h6"
              color={activeStep >= 3 ? "amber" : "gray"}>
              Tailwind
            </Typography>
          </div>
        </Step>
        <Step
          className={`sm:h-10 sm:w-10 w-8 h-8 ${
            activeStep >= 4 ? "!bg-orange" : "gray"
          }`}>
          <FaGithub className="sm:h-5 sm:w-5 w-4 h-4" />
          <div className="absolute -bottom-[2rem] w-max text-center hidden sm:flex">
            <Typography
              className="font-rem"
              variant="h6"
              color={activeStep >= 4 ? "amber" : "gray"}>
              Github
            </Typography>
          </div>
        </Step>
        <Step
          className={`sm:h-10 sm:w-10 w-8 h-8 ${
            activeStep >= 5 ? "!bg-orange" : "gray"
          }`}>
          <FaJs className="sm:h-5 sm:w-5 w-4 h-4" />
          <div className="absolute -bottom-[2rem] w-max text-center hidden sm:flex">
            <Typography
              className="font-rem"
              variant="h6"
              color={activeStep >= 5 ? "amber" : "gray"}>
              JS
            </Typography>
          </div>
        </Step>
        <Step
          className={`sm:h-10 sm:w-10 w-8 h-8 ${
            activeStep >= 5 ? "!bg-orange" : "gray"
          }`}>
          <FaReact className="sm:h-5 sm:w-5 w-4 h-4" />
          <div className="absolute -bottom-[2rem] w-max text-center hidden sm:flex">
            <Typography
              className="font-rem"
              variant="h6"
              color={activeStep >= 5 ? "amber" : "gray"}>
              React
            </Typography>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default StudyStepper;
