import React from "react";
import Layout from "../Layout/Layout";
import Calendar from "../Calnedar/Calendar";

const Homepage = () => {
  return (
    <>
      <Layout heading="Home">
        <div className="flex  flex-col">
          <h1 className=" font-semibold text-2xl text-slate-500 flex justify-start m-5">
            Calendar
          </h1>
        </div>
        <div className="flex flex-col m-4">
          <Calendar />
        </div>
      </Layout>
    </>
  );
};

export default Homepage;
