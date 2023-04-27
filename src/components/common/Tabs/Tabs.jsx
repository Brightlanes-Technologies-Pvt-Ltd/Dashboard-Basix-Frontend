import React from "react";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";

const Tabs = () => {
  return (
    <>
      {/* <div class="py-4 px-4 md:px-8 bg-gray-100">
        <ul
          role="tablist"
          class="hidden max-w-screen-xl mx-auto px-2.5 items-center gap-x-3 overflow-x-auto text-sm bg-gray-50 dark:bg-slate-800 rounded-lg sm:flex"
        >
          <li class="py-2">
            <button
              role="tab"
              class="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-white active:bg-white/50 font-medium bg-white text-indigo-500 shadow-sm"
            >
              Profile
            </button>
          </li>
          <li class="py-2">
            <button
              role="tab"
              class="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-white active:bg-white/50 font-medium text-gray-500 dark:text-gray-300 dark:hover:text-indigo-800"
            >
              Transactions
            </button>
          </li>
          <li class="py-2">
            <button
              role="tab"
              class="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-white active:bg-white/50 font-medium text-gray-500 dark:text-gray-300 dark:hover:text-indigo-800"
            >
              Billing
            </button>
          </li>
          <li class="py-2">
            <button
              role="tab"
              class="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-white active:bg-white/50 font-medium text-gray-500 dark:text-gray-300 dark:hover:text-indigo-800"
            >
              Transactions
            </button>
          </li>
          <li class="py-2">
            <button
              role="tab"
              class="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-white active:bg-white/50 font-medium text-gray-500 dark:text-gray-300 dark:hover:text-indigo-800"
            >
              plans
            </button>
          </li>
        </ul>
        <div class="relative text-gray-500 sm:hidden">
         
          <select class="p-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-indigo-500">
            <option>Profile</option>
            <option>Integration</option>
            <option>Billing</option>
            <option>Transactions</option>
            <option>plans</option>
          </select>
        </div>
      </div> */}
      <div className="flex justify-center items-center  ">
        <div className="flex flex-row  py-4 ">
          <Link to={"/personal"}>
            <div dir="ltr">
              <Button
                color="bg-blue-900 text-white"
                hover={"hover:bg-blue-600 hover:text-white"}
                className="px-8 py-2 font-semibold rounded-s-lg  "
                text={"Profile"}
              />
            </div>
          </Link>
          <Link to={"/activity"}>
            <Button
              color="bg-blue-900 text-white"
              hover={"hover:bg-blue-600 hover:text-white"}
              className="px-8 py-2 font-semibold border-x border-gray-100"
              text={"My classes"}
            />
          </Link>
          <Link to={"/documents"}>
            <Button
              color="bg-blue-900 text-white"
              hover={"hover:bg-blue-600 hover:text-white"}
              className="px-8 py-2 font-semibold border-x border-gray-100 "
              text={"Documents"}
            />
          </Link>
          <Link to={"/transactions"}>
            <div dir="rtl">
              {" "}
              <Button
                color="bg-blue-900 text-white"
                hover={"hover:bg-blue-600 hover:text-white"}
                className="px-8 py-2 font-semibold rounded-s-lg "
                text={"Transactions"}
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Tabs;
