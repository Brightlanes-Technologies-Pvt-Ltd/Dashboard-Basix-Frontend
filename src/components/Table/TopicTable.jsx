import React, { useEffect, useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { BsFiletypeCsv } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";
import { getAlTopicsOfAClass } from "../../utils/api/classApI/topicAPI";
import Layout from "../Layout/Layout";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";


import ClassForm from '../Form/ClassForm'
const TopicTable = () => {
  const navigate = useNavigate();
  const { classId } = useParams();

  const [showEditModal, setShowEditModal] = useState(false);

  const [topicData, setTopicData] = useState([]);
  const [topicTitle, setTitle] = useState([
    "description",
    "completed",
    "aws",
    "material Distributed",
    "test",
    "mentorship",
    " ",
  ]);

  const handleOnClose = () => setShowEditModal(false);

  const [toggle, setToggle] = useState({
    options: false,
    modal: false,
  });
  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const {
  //           data: { classes },
  //         } = await classId;

  //         setClasses([...classes]);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     })();
  //   }, []);

  const changeAgenda = (e) => {
    setTopicData({ ...topicData, [e.target.name]: !topicData.e.target.name });
  };
  console.log("topicdata", topicData);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAlTopicsOfAClass(classId);

        // setCourse([{ ...course }]);
        setTopicData([...data.topics]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const showModal = () => {
    setToggle({
      ...toggle,
      options: !toggle.options,
    });
  };

  const navigateTo = () => {
    navigate("/add-course");
  };
  return (
    <>
      <Layout heading={"classes"}>
        <div className="mr-4 flex  justify-end  z-10">
          <Button
            callback={showModal}
            text={"Add Classes"}
            Icon={<AiOutlinePlus className="mt-1" />}
            className="flex flex-row p-3 rounded-xl gap-2 text-white font-semibold"
          />
        </div>
        <div className="w-36  justify-center  fixed  right-5 z-10 ">
          {toggle.options ? (
            <div className=" text-center rounded-md bg-white gap-x-1  shadow-lg p-2">
              <p
                className="  border-b hover:bg-sky-100 hover:shadow-sm rounded-md justify-center gap-x-2 text-sm  flex  font-medium text-blue-900  py-2"
                onClick={navigateTo}
              >
                Form <FaWpforms />
              </p>
              <p
                className=" hover:bg-sky-100 hover:shadow-sm rounded-md justify-center gap-x-3 text-sm  flex  font-medium text-blue-900  py-2 "
                onClick={() => {
                  setToggle({
                    ...toggle,
                    modal: !toggle.modal,
                  });
                }}
              >
                CSV <BsFiletypeCsv />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>

        <div
          onClick={() =>
            setToggle({
              ...toggle,
              modal: !toggle.modal,
            })
          }
        ></div>

        <div className="flex flex-col gap-5 p-8 text-sm font-semibold tracking-wide text-slate-700  ">
          <table className="w-full shadow-lg">
            <thead
              className="bg-gray-50 border-b-2 border-gray 
          "
            >
              <tr>
                {topicTitle &&
                  topicTitle.map((thead, index) => {
                    return (
                      <th className="p-3 text-sm font-semibold tracking-wide uppercase">
                        {thead}
                      </th>
                    );
                  })}
              </tr>
            </thead>
            <tbody>
              {topicData &&
                topicData.map((td, index) => {
                  return (
                    <tr
                      className={
                        index % 2 === 0
                          ? "bg-blue-50 hover:text-blue-700 hover:text-lg hover:ring rounded-lg ring-offset-blue-200"
                          : "bg-white  hover:text-blue-700 hover:text-lg hover:ring rounded-lg ring-offset-blue-200"
                      }
                      key={td._id}
                    >
                      <th className="p-3 text-sm font-semibold tracking-wide">
                        {td.description}
                      </th>

                      <th className="  cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                        <input
                          type="checkbox"
                          name="aws"
                          defaultChecked={td.aws}
                          onChange={changeAgenda}
                        />
                      </th>
                      <th className="  cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                        <input
                          type="checkbox"
                          name="aws"
                          defaultChecked={td.aws}
                          onChange={changeAgenda}
                        />
                      </th>
                      <th className="  cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                        <input
                          type="checkbox"
                          name="materialDistributed"
                          defaultChecked={td.materialDistributed}
                          onChange={changeAgenda}
                        />
                      </th>
                      <th className="  cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                        <input
                          type="checkbox"
                          name="test"
                          defaultChecked={td.test}
                          onChange={changeAgenda}
                        />
                      </th>
                      <th className="  cursor-pointer  p-3 text-sm font-semibold tracking-wide ">
                        <input
                          type="checkbox"
                          name="mentorship"
                          defaultChecked={td.mentorship}
                          onChange={changeAgenda}
                        />
                      </th>

                      <th className="cursor-pointer  p-3 text-sm font-semibold tracking-wide flex justify-end">
                        <Modal
                          onClose={handleOnClose}
                          visible={showEditModal}
                        >{<ClassForm /> }</Modal>

                        <div>
                          <SlOptionsVertical
                            onClick={() => setShowEditModal(true)}
                          />
                        </div>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default TopicTable;
