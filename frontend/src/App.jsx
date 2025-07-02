import { useSelector } from "react-redux";
import { Route, Routes, Navigate, Router } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { Home } from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Myprofile from "./components/core/dashboard/profile/Myprofile";
import EnrolledCourses from "./components/core/dashboard/Student/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import PurchaseHistory from "./components/core/dashboard/Student/PurchaseHistory";
import AddCourse from "./components/core/dashboard/Instructor/Course/AddCourse";
import CourseBuilder from "./components/core/dashboard/Instructor/Section/CourseBuilder";
import Laststep from "./components/core/dashboard/Instructor/SubSection/Laststep";
import MyCourse from "./components/core/dashboard/Instructor/CourseDetails/MyCourse";
import Instructor from "./components/core/dashboard/Instructor";
import EditProfileDetails from "./components/core/dashboard/profile/EditProfileDetails";
import OneCourseDetails from "./components/core/dashboard/Instructor/CourseDetails/OneCourseDetails";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-richblack-900 min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Courses/>} />
          <Route path="/courses/course-details/:id" element={<CourseDetails />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Redirect /dashboard to /dashboard/my-profile */}
            <Route index element={<Navigate to="my-profile" replace />} />
            <Route path="my-profile" element={
              <Myprofile />
            } />
            <Route path="edit-profile-details" element = {<EditProfileDetails />} />

            {/* Student-only routes */}
            {user?.accountType === ACCOUNT_TYPE.Student && (
              <>
                <Route path="enrolled-courses" element={<EnrolledCourses />} />
                <Route path="purchase-history" element={<PurchaseHistory />} />
              </>
            )}

            {/* Instructor-only routes */}
            {user?.accountType === ACCOUNT_TYPE.Instructor && (
              <>
                <Route path="add-course" element={<AddCourse />} />
                <Route path="add-section" element={<CourseBuilder />} />
                <Route path="last-step" element={<Laststep />} />
                <Route path="my-courses" element={<MyCourse/>} />
                <Route path="my-courses/:id" element={<OneCourseDetails/>}/>
                <Route path="instructor" element={<Instructor/>} />
              </>
            )}

          </Route>

        </Routes>
      </main>
    </div>
  );
}

export default App;
