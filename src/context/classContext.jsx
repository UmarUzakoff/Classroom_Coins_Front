import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import API from '../utils/api';

const ClassroomDataContext = createContext();

export const useClassroomData = () => useContext(ClassroomDataContext);

const ClassroomDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchData = async (id, token) => {
    try {
      const response = await axios.get(
        `${API}/classroom/${id}`,
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

  return (
    <ClassroomDataContext.Provider value={[data,students, fetchData]}>
      {children}
    </ClassroomDataContext.Provider>
  );
};

export default ClassroomDataProvider;