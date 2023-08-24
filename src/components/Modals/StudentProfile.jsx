import React, { useContext } from "react";
import { FaXing } from "react-icons/fa";
import { ThemeApi } from "../../context/themeContext";

const StudentProfileModal = ({
  handleModal,
  name,
  surname,
  email,
  classname,
  coins,
}) => {
  const { theme } = useContext(ThemeApi);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-2xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Student Profile</h3>
              <button
                onClick={() => handleModal(2)}
                className="text-gray-600 transition duration-300 rounded-full hover:bg-gray-500 hover:text-white p-2">
                <FaXing />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex flex-row gap-5 sm:gap-20 text-sm sm:text-xl">
              <div className="flex flex-col text-start items-start gap-2 sm:gap-5 w-20">
                <h5 className="font-bold">Name: </h5>
                <h5 className="font-bold">Surname: </h5>
                <h5 className="font-bold">Email: </h5>
                <h5 className="font-bold">ClassName: </h5>
                <h5 className="font-bold">Coins: </h5>
              </div>
              <div className="flex flex-col text-start items-start gap-2 sm:gap-5 ">
                <span>{name}</span>
                <span>{surname}</span>
                <span>{email}</span>
                <span>{classname}</span>
                <span>{coins}</span>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-orange shadow-xl border border-gray-400 active:bg-orange active:text-white rounded-xl font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-300"
                type="button"
                onClick={() => handleModal(2)}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default StudentProfileModal;
