import { Link } from "react-router-dom";

export const ButtonBtn = ({ Text, link, bgColor }) => {
  return (
    <Link to={link}>
      <button className={`${bgColor} shadow-sm shadow-richblack-200 hover:scale-95 transition-all duration-100`}>
        {Text}
      </button>
    </Link>
  );
};
