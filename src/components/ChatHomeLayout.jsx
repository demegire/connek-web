import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export const ChatHomeLayout = ({ children }) => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};
