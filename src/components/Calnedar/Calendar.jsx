import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // a plugin!
import { setClass } from "../../redux/feateres/classSlice";
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

  const toggleForm = () => {
    setModal({ form: !modal.form, csv: false });
  };

  const toggleCsvForm = () => {
    setModal({ form: false, csv: !modal.csv });
  };

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
    if (user.role === "teacher") {
      (async () => {
        try {
          const {
            data: { classes },
          } = await getTeachersClasses(user._id);

          setAllClasses([...classes]);
          // dispatch(setClass(allClass.data.classes));
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);
  console.log(allClasses);
  return (
    <>
      <div className="">
        <CalenderApp
          events={mockEvents}
          onDelete={deleteEvent}
          onEdit={editEvent}
        />
      </div>
    </>
  );
};

export default Calendar;
