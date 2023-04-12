import React from "react";

const Input = ({
  label,
  type,
  name,
  value,
  placeholder,
  callback,
  disabled = false,
  color = "",
  height = "",
  aftertext = "*",
}) => {
  return (
    <label className="block">
      <span
        className={` after:content-['${aftertext}'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700`}
      >
        {label}
      </span>
      <input
        className={`h-${height} mt-1 px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-300 
                placeholder:text-xs
                focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  ${color}`}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={(e) => callback(e)}
        disabled={disabled}
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
