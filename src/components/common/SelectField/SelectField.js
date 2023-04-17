import React from "react";

const SelectInputField = ({
  options,
  callback,
  name,
  label,
  defaultValue,
  disabled = false,
}) => {
  return (
    <label className="block">
      <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={(e) => callback(e)}
        className={`mt-1 px-2 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 
       placeholder:text-sm
       focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  `}
      >
        <option value={defaultValue}>{defaultValue}</option>
        {options &&
          options.map((value) => (
            <option value={value.value} key={value.value}>
              {value.name}
            </option>
          ))}
      </select>
    </label>
  );
};

export default SelectInputField;
