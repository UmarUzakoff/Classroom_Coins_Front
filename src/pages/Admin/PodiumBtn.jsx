import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React from "react";
import { FaMedal } from "react-icons/fa";
import { Link } from "react-router-dom";
import winnersData from "../Podium/podium.data";

export const PodiumBtn = ({classroomId, classname}) => {
  const filteredMonths = winnersData
    .map((classroom) => {
      if (classroom.classroomName === classname) {
        return classroom.months;
      }
      return [];
    })
    .flat();
  return (
    <Menu
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}>
      <MenuHandler>
        <Button
          color={`blue-gray`}
          variant="gradient"
          size="sm"
          className="flex flex-row gap-2 items-stretch my-2">
          Winner's&nbsp;Podium
          <FaMedal color="yellow" />
        </Button>
      </MenuHandler>
      <MenuList className="max-h-72 bg-gradient-to-br from-blue-gray-400 to-gray-700">
        {filteredMonths.length ? (
          filteredMonths.map((classroom) => (
            <Link
              key={classroom.monthNum}
              to={`/podium/${classroomId}/${classroom.monthNum}`}>
              <MenuItem className={`text-grey`}>
                {classroom.monthNum} - month
              </MenuItem>
            </Link>
          ))
        ) : (
          <MenuItem className="text-dark">No winners yet</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
