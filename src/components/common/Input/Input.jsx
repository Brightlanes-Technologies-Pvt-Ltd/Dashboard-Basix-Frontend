import React from "react";

const Input = ({
  label,
  type,
  name,
  value,
  placeholder,
  checked = false,

  secondCallback = () => {},
  callback = () => {},
  disabled = false,
  color = "",
  border = "border",
  height = "",
  aftertext = "*",
  labelClassName = "block",
  block = "block",
  inputClassName = "  focus:outline-none focus:border-sky-500  focus:ring-sky-500 focus:ring-1 mt-1 px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-300 placeholder:text-xs  w-full  rounded-md sm:text-sm",
}) => {
  return (
    <label className={`${labelClassName} `}>
      <span
        className={` after:content-['${aftertext}'] after:ml-0.5 after:text-red-500 ${block}   text-sm font-medium text-slate-700`}
      >
        {label}
      </span>
      <input
        className={`h-${height}  ${inputClassName} ${color} ${block} ${border}`}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={(e) => callback(e)}
        onClick={(e) => secondCallback(e)}
        disabled={disabled}
        checked={checked}
      />
      {/* {formErrors.nameError.status ? (
      <p className={`text-red-500 text-xs  mx-1`}>
        {" "}
        {formErrors.nameError.error} *
      </p>
    ) : (
      ""
    )} */}
    </label>
  );
};

export default Input;
