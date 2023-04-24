import React, { useState } from "react";
import Input from "../common/Input/Input";

import { useEffect } from "react";
import { getATopicbyId } from "../../utils/api/classApI/topicAPI";
import Button from "../Button/Button";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AgendaForm = ({
  topicId,
  handleOnCloseAgendaForm,
  updateAgenda,
  createAgendaTopic,
}) => {
  const [topicData, setTopicData] = useState({});

  const [description, setDescription] = useState({
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    topicHours: 0,
    completed: "",
    aws: false,
    materialDistributed: false,
    test: false,
    mentorship: false,
    Action: "",
  });

  const getDescription = (e) => {
    setDescription({
      ...description,
      [e.target.name]: e.target.value,
    });
  };

  console.log("Bharat", description);

  useEffect(() => {
    const start = new Date(description.startDate);
    start.setHours(description.startTime.getHours());
    start.setMinutes(description.startTime.getMinutes());

    const end = new Date(description.endDate);
    end.setHours(description.endTime.getHours());
    end.setMinutes(description.endTime.getMinutes());

    const diff = (end - start) / (1000 * 60 * 60); // Difference in hours
    setDescription({
      ...description,
      topicHours: diff,
      startDate: start,
      endDate: end,
    });
  }, [description.startTime, description.endTime]);

  const getAgendaData = (e) => {
    console.log(e.target.name, e.target.value);
    setDescription({
      ...description,
      [e.target.name]: !description[e.target.name],
    });
  };

  const SingleTopic = async () => {
    try {
      const {
        data: {
          TopicData: {
            description,
            startDate,
            endDate,
            topicHours,
            completed,
            aws,
            materialDistributed,
            test,
            mentorship,
          },
        },
      } = await getATopicbyId(topicId);

      setDescription({
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        startTime: new Date(startDate),
        endTime: new Date(endDate),
        topicHours,
        completed,
        aws,
        materialDistributed,
        test,
        mentorship,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (topicId) {
      SingleTopic();
    }
  }, []);

  return (
    <>
      <div className=" rounded-md justify-center mx-6 my-4">
        <div className="  flex-col gap-4 flex">
          <Input
            label={"DESCRIPTION"}
            type={"text"}
            name={"description"}
            value={description.description}
            // inputClassName="m-3"
            aftertext="none"
            block=""
            callback={getDescription}
          />

          <label className="flex text-sm font-medium text-slate-700">
            Topic Start Date &amp; Time
          </label>
          <div className="flex flex-row  ">
            <ReactDatePicker
              selected={description.startDate}
              aftertext="none"
              onChange={(date) =>
                setDescription({
                  ...description,
                  startDate: date,
                })
              }
              className="border border-gray-300  w-28 text-center py-2 shadow-sm  rounded text-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  sm:text-sm focus:ring-1  placeholder-gray-500  "
            />

            <ReactDatePicker
              type={"time"}
              selected={description.startTime}
              onChange={(date) =>
                setDescription({
                  ...description,
                  startTime: date,
                })
              }
              showTimeSelect
              showTimeSelectOnly
              timeCaption="Time"
              dateFormat=" hh:mm aa"
              className="border border-gray-300  w-28 text-center py-2 shadow-sm  rounded text-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  sm:text-sm focus:ring-1  placeholder-gray-500  "
            />
          </div>

          <label className="flex text-md font-medium text-slate-700">
            Topic End Date &amp; Time
          </label>
          <div className=" flex flex-row  ">
            <ReactDatePicker
              selected={description.endDate}
              onChange={(date) =>
                setDescription({ ...description, endDate: date })
              }
              className="border border-gray-300  w-28 text-center py-2 shadow-sm  rounded text-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  sm:text-sm focus:ring-1  placeholder-gray-500  "
            />

            <ReactDatePicker
              selected={description.endTime}
              onChange={(date) =>
                setDescription({ ...description, endTime: date })
              }
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="hh:mm aa"
              className="border border-gray-300  w-28 text-center py-2 shadow-sm  rounded text-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  sm:text-sm focus:ring-1  placeholder-gray-500  "
            />
          </div>

          <Input
            label={"No. Of Hours"}
            type={"number"}
            name={"topicHours"}
            value={description.topicHours}
            checked={description.topicHours}
            labelClassName="flex flex-col justify-center align-center"
            inputClassName="text-sm flex  justify-center text-slate-400 mt-3 ml-1 py-1 px-2 rounded-md focus:outline-none focus:border-sky-500  focus:ring-sky-500 focus:ring-1 "
            aftertext="none"
            disabled={true}
            block=""
            callback={getDescription}
          />
        </div>
        <div className="text-lg my-4 font-semibold justify-center text-slate-700 flex  ">
          Agendas
        </div>
        <div className=" bg-blue-50 flex flex-col border align-middle pl-5 gap-x-6 rounded-md justify-center ">
          <Input
            label={"COMPLETED"}
            type={"checkbox"}
            name={"completed"}
            labelClassName="ml-1"
            // value={description.completed}
            secondCallback={getAgendaData}
            checked={description.completed}
            inputClassName=" mx-20 my-3"
            aftertext="none"
            block=""
          />
  
          <Input
            label={"AWS"}
            type={"checkbox"}
            name={"aws"}
            checked={description.aws}
            value={description.aws}
            secondCallback={getAgendaData}
            inputClassName="my-3  mx-32"
            block=""
            aftertext="none"
            labelClassName="ml-2"
          />

          <Input
            label={"MATERIAL DISTRIBUTED"}
            type={"checkbox"}
            name={"materialDistributed"}
            value={description.materialDistributed}
            secondCallback={getAgendaData}
            checked={description.materialDistributed}
            inputClassName="my-3 ml-1.5"
            aftertext="none"
            block=""
          />
          <Input
            label={"TEST"}
            type={"checkbox"}
            name={"test"}
            labelClassName="ml-2.5"
            value={description.test}
            secondCallback={getAgendaData}
            checked={description.test}
            inputClassName="my-3 ml-32"
            aftertext="none"
            block=""
          />
          <Input
            label={"MENTORSHIP"}
            labelClassName="mr-12"
            type={"checkbox"}
            name={"mentorship"}
            value={description.mentorship}
            secondCallback={getAgendaData}
            checked={description.mentorship}
            inputClassName="ml-20 my-3"
            aftertext="none"
            block=""
          />
        </div>
      </div>

      <ul className="flex justify-between ">
        <li className="">
          {topicId !== null ? (
            <button
              onClick={() => {
                updateAgenda(topicId, description);
              }}
              className="mt-2 self-center bg-blue-700 text-sm text-white hover:bg-blue-900 block px-4 py-3 rounded-[12px]  drop-shadow-xl font-semibold"
            >
              Update
            </button>
          ) : (
            <button
              onClick={() => {
                createAgendaTopic(description);
              }}
              className="mt-2 self-center bg-blue-700 text-sm text-white hover:bg-blue-900 block px-4 py-3 rounded-[12px]  drop-shadow-xl font-semibold"
            >
              Create
            </button>
          )}
        </li>
        <li>
          <Button
            callback={handleOnCloseAgendaForm}
            text={"Discard"}
            color={"bg-red-600 "}
            hover={"hover:bg-red-900"}
          />
        </li>
      </ul>
    </>
  );
};

export default AgendaForm;
