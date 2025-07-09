import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiSolidFoodMenu } from "react-icons/bi";

const Navbar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const token = useSelector((state) => state.auth.token);

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/courses", name: "Courses" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
  ];

  const closeMobileMenu = () => {
    const menu = document.getElementById("navbar-sticky");
    if (menu) {
      menu.classList.add("hidden");
    }
  };

  const renderAuthButton = (onClickHandler) => {
    if (token === null) {
      return isLoginPage ? (
        <Link
          to="/signup"
          onClick={onClickHandler}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Get Started
        </Link>
      ) : (
        <Link
          to="/login"
          onClick={onClickHandler}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </Link>
      );
    }

    return (
      <Link
        to="/dashboard"
        onClick={onClickHandler}
        className="text-white bg-yellow-25 hover:bg-yellow-300 focus:ring-2 focus:outline-none focus:bg-yellow-50 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-yellow-50 dark:hove:bg-yellow-100"
      >
        Dashboard
      </Link>
    );
  };

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 w-full fixed z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Edtech
            </span>
          </NavLink>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="hidden md:block">{renderAuthButton()}</div>
            <p
              onClick={() =>
                document
                  .getElementById("navbar-sticky")
                  .classList.toggle("hidden")
              }
              className="md:hidden cursor-pointer text-4xl hover:text-yellow-100 transform duration-75"
            >
              <BiSolidFoodMenu />
            </p>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={closeMobileMenu}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current={
                      location.pathname === link.path ? "page" : undefined
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              <li className="md:hidden mt-4">{renderAuthButton(closeMobileMenu)}</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
