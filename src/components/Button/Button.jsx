import React from "react";

const Button = ({
  text,
  callback,
  color = "bg-sky-500",
  hover = "hover:bg-sky-700",
}) => {
  return (
    <button
      className={`  mt-2 self-center text-sm text-white ${color} ${hover} hover:text-white block px-4 py-3 rounded-[12px]  `}
      onClick={callback}
    >
      {text}
    </button>
  );
};

export default Button;
