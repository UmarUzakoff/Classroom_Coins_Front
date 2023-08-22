import React from "react";
import { Link } from "react-router-dom";
import ghost from "../.././images/ghost.png";

const PageNotFound = () => {
  return (
    <section className="grid h-screen pt-32 pb-16 font-rem bg-orange rounded-b-xl lg:rounded-none">
      <div className="container grid content-center gap-12 lg:max-w-5xl lg:grid-cols-2 lg:items-center">
        <div className="justify-self-center text-center lg:text-left">
          <p className="pb-2 font-semibold">Error 404</p>
          <h1 className="pb-4 text-5xl font-bold lg:text-6xl">Hey Buddy</h1>
          <p className="pb-8 font-semibold">
            We can't seem to find the page <br />
            you are looking for.
          </p>
          <Link
            to={"/"}
            className="inline-flex items-center justify-center rounded-full bg-gray-900 hover:bg-gray-800 hover:animate-shake transition duration-300 py-4 px-8 font-bold text-white">
            Go Home
          </Link>
        </div>

        <div className="justify-self-center">
          <img
            src={ghost}
            className="w-64 animate-floting lg:w-[400px]"
            alt="Ghost"
          />
          <div className="mx-auto h-8 w-36 animate-shadow rounded-[50%] bg-gray-900/30 blur-md lg:w-64"></div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 self-end text-sm font-semibold">
        <p><a href="tel:+998999938869">+998 99 993 8869</a></p>
        <p>|</p>
        <Link to={"https://dcamp.io/coddycamp"} target={"_blank"}>info@coddycamp.com</Link>
      </div>
    </section>
  );
};

export default PageNotFound;
