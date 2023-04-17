import React from "react";

const Button = ({
  text,
  callback,
  color = "bg-blue-700",
  hover = "hover:bg-blue-800",
  Icon,
  className = "mt-2 self-center  text-sm text-white  hover:text-white block px-4 py-3 rounded-[12px]  drop-shadow-xl font-semibold",
}) => {
  return (
    <button className={`  ${className} ${color} ${hover}  `} onClick={callback}>
      {text}
      {Icon}
    </button>
  );
};

export default Button;
