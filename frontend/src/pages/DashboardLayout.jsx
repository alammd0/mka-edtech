import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components/core/dashboard/Sidebar";
import CourseSidebar from "../components/core/dashboard/Instructor/CourseDetails/CourseSidebar";

const DashboardLayout = () => {
  const location = useLocation();
  const isCoursePage = location.pathname.includes("/dashboard/my-courses/");
  console.log("Course path - ", isCoursePage);

  return (
    <div className="mt-[70px] flex justify-between mx-auto">
      {!isCoursePage && <Sidebar />}

      <div className={`${!isCoursePage ? "ml-[20%] w-[82%] min-h-screen overflow-auto mt-4" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
