import { Layout } from "./components";
import { AddClass, AdminLogin, Classroom, Dashboard, HomePage, LoginPage, SettingsPage } from "./pages";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/admin/auth/login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/classroom/:id" element={<Classroom />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/addclassroom" element={<AddClass />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </>
  );
};

export default App;
