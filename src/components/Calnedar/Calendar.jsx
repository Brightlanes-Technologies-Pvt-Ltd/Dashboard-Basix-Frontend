import React, { useEffect, useState } from "react";

import {
  getClasses,
  getTeachersClasses,
} from "../../utils/api/classApI/classApi";
import { useDispatch, useSelector } from "react-redux";
import CalenderApp from "./CalendarApp";
const Calendar = () => {
  const [allClasses, setAllClasses] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [modal, setModal] = useState({
    form: false,
    csv: false,
  });
  const dispatch = useDispatch();
  const [mockEvents, updateEvent] = useState([]);

  const [theme, settheme] = useState({
    value: "bg-danger",
    label: "Company",
  });

  const displayEventsInCalender = () => {
    // showing events in calender
    const events = [];
    allClasses &&
      allClasses.map((value) => {
        let newEvent = {
          id: `default-event-id-${value._id}`,
          title: value.className,
          start: value.startDate,
          end: value.endDate,
          description: value.description,
          className: theme.value,
          type: theme.value,
          faculty: value.faculty,
        };
        events.push(newEvent);
      });
    updateEvent([...events]);
  };
  console.log(allClasses);

  useEffect(() => {
    if (allClasses.length > 0) {
      displayEventsInCalender();
    }
  }, [allClasses]);

  const editEvent = (formData) => {
    let newEvents = [...mockEvents];
    const index = newEvents.findIndex((item) => item.id === formData.id);
    newEvents[index] = formData;
    updateEvent(newEvents);
  };

  const deleteEvent = (id) => {
    let filteredEvents = mockEvents.filter((item) => item.id !== id);
    updateEvent(filteredEvents);
  };

  useEffect(() => {
    (async () => {
      try {
        if (user.role === "teacher") {
          const {
            data: { classes },
          } = await getTeachersClasses(user._id);

          setAllClasses([...classes]);
          // dispatch(setClass(allClass.data.classes));
        } else {
          const {
            data: { classes },
          } = await getClasses();

          setAllClasses([...classes]);
          // dispatch(setClass(allClass.data.classes));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(allClasses);
  return (
    <>
      <div className=" flex justify-center align-middle ">
     
        <div className=" bg-white  drop-shadow-lg w-9/12 h-full  p-2">
          <CalenderApp
            className=" "
            events={mockEvents}
            onDelete={deleteEvent}
            onEdit={editEvent}
          />
        </div>
      </div>
    </>
  );
};

export default Calendar;
