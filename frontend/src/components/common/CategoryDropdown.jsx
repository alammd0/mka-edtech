import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownFill } from "react-icons/ri";

const CategoryDropdown = ({ category }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 1000);
  };

  return (
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
   
        <span className="flex items-center justify-center gap-1 py-2 px-3 text-gray-900 cursor-pointer rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-200">
          Categories
           <RiArrowDropDownFill />
        </span>

      {showDropdown && (
        <ul className="absolute left-0 mt-2 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 rounded-md shadow-lg z-50 min-w-[180px] transition-all duration-200">
          {category.map((item, index) => (
            <li key={index}>
              <Link
                to={`/category/${item.name}`}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryDropdown;
