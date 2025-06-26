import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/core/dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="mt-[70px] flex justify-between mx-auto">
      <Sidebar></Sidebar>

      <div className="ml-[20%] w-[82%] min-h-screen overflow-auto mt-4"> 
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
