import { Layout } from "./components";
import {
  AddClass,
  AdminLogin,
  Classroom,
  Dashboard,
  HomePage,
  LoginPage,
  PageNotFound,
  SettingsPage,
} from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { ThemeApi } from "./context/themeContext";

const App = () => {
  const { theme } = useContext(ThemeApi);

  return (
    <div className={`${theme === "dark" ? "bg-dark" : "bg-grey"}`}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/admin/auth/login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/classroom/:id" element={<Classroom />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/addclassroom" element={<AddClass />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </div>
  );
};

export default App;
