import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components/core/dashboard/Sidebar";


const DashboardLayout = () => {
  const location = useLocation();

  const hideSidebarRoutes = [
    "/dashboard/my-courses/"
  ];

  const isSidebarHidden = hideSidebarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="mt-[60px] flex justify-between mx-auto">
      {!isSidebarHidden && <Sidebar/>}

      <div
        className={`${
          !isSidebarHidden
            ? "ml-[20%] w-[82%] min-h-screen overflow-auto mt-4"
            : "w-full min-h-screen overflow-auto mt-4"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
