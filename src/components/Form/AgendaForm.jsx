import React, { useState } from "react";
import Input from "../common/Input/Input";

import { useEffect } from "react";
import { getATopicbyId } from "../../utils/api/classApI/topicAPI";
import Button from "../Button/Button";

const AgendaForm = ({ topicId, handleOnCloseAgendaForm, updateAgenda }) => {
  const [topicData, setTopicData] = useState({});
  const getAgendaData = (e) => {
    console.log(e.target.name, e.target.value);
    setTopicData({ ...topicData, [e.target.name]: !topicData[e.target.name] });
  };

  const SingleTopic = async () => {
    try {
      const {
        data: { TopicData },
      } = await getATopicbyId(topicId);
      console.log(TopicData, topicId);
      setTopicData({ ...TopicData });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(topicData);
  useEffect(() => {
    SingleTopic();
  }, []);

  return (
    <>
      <div className=" bg-blue-50 flex flex-row gap-4 rounded-md justify-center mx-6 my-4">
        <Input
          label={"COMPLETED"}
          type={"checkbox"}
          name={"completed"}
          value={topicData.completed}
          secondCallback={getAgendaData}
          defaultCheck={topicData.completed}
          inputClassName="m-3"
          aftertext="none"
          block=""
        />
        <Input
          label={"AWS"}
          type={"checkbox"}
          name={"aws"}
          defaultCheck={topicData.aws}
          value={topicData.aws}
          secondCallback={getAgendaData}
          inputClassName="m-3"
          block=""
          aftertext="none"
        />

        <Input
          label={"MATERIAL DISTRIBUTED"}
          type={"checkbox"}
          name={"materialDistributed"}
          value={topicData.materialDistributed}
          secondCallback={getAgendaData}
          defaultCheck={topicData.materialDistributed}
          inputClassName="m-3"
          aftertext="none"
          block=""
        />
        <Input
          label={"TEST"}
          type={"checkbox"}
          name={"test"}
          value={topicData.test}
          secondCallback={getAgendaData}
          defaultCheck={topicData.test}
          inputClassName="m-3"
          aftertext="none"
          block=""
        />
        <Input
          label={"MENTORSHIP"}
          type={"checkbox"}
          name={"mentorship"}
          value={topicData.mentorship}
          secondCallback={getAgendaData}
          defaultCheck={topicData.mentorship}
          inputClassName="m-3"
          aftertext="none"
          block=""
        />
      </div>

      <ul className="flex justify-between ">
        <li className="">
          <button
            onClick={() => {
              updateAgenda(topicId, topicData);
            }}
            className="mt-2 self-center bg-blue-700 text-sm text-white hover:bg-blue-900 block px-4 py-3 rounded-[12px]  drop-shadow-xl font-semibold"
          >
            Update
          </button>
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
