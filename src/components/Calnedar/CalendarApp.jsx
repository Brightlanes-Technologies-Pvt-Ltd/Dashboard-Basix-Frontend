import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Chip,
  Typography,
} from "@material-tailwind/react";

import { deleteClass } from "../../utils/api/classApI/classApi";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { setClass } from "../../redux/feateres/classSlice";
import { useDispatch } from "react-redux";
import ClassForm from "../Form/ClassForm";
import Modal from "../Modal/Modal";
import { ModalBody, ModalHeader } from "reactstrap";

const EventView = (event) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const { title, extendedProps, publicId } = event.event.event._def;
  const [openPopover, setOpenPopover] = React.useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <>
      <div
        id={publicId}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        {title}
      </div>{" "}
      <PopoverHandler {...triggers}>
        {" "}
        <PopoverContent>{extendedProps.description}</PopoverContent>
      </PopoverHandler>
    </>
  );
};

const CalenderApp = ({ events, onDelete, onEdit }) => {
  const allClasses = useSelector((state) => state.classReducer.class);
  const [modalState, updateModal] = useState(false);
  const [mockEvents, updateEvents] = useState(events);
  const [event, updateEvent] = useState({});
  const [theme, settheme] = useState();
  const [edit, updateEditModal] = useState(false);
  const [dates, setDates] = useState({
    startDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    endDate: new Date(),
  });

  useEffect(() => {
    updateEvents(events);
  }, [events]);
  const dispatch = useDispatch();

  const handleFormSubmit = (formData) => {
    let newEvent = {};
    newEvent = {
      id: event.id,
      className: theme.value,
      type: theme,
      title: formData.title,
      start: event.start,
      end: event.end,
      description: formData.description,
    };
    onEdit(newEvent);

    toggleEdit();
  };
  console.log(event.end, event.start);
  const toggle = () => {
    updateModal(!modalState);
  };

  const toggleEdit = () => {
    updateEditModal(!edit);
  };

  const handleEventClick = (info) => {
    const event = events.find((item) => item.id === info.event._def.publicId);
    console.log(event);
    updateEvent(event);
    settheme(event.type);
    toggle();
  };

  const deleteAClass = async () => {
    try {
      if (event.id) {
        const { data } = await deleteClass(event.id.split("-")[3]);
        const updatedClasses = allClasses.filter(
          (value) => value._id !== event.id.split("-")[3]
        );

        toast.success(data.message, {
          autoClose: 1000,
        });
        dispatch(setClass(updatedClasses));
        setTimeout(() => {
          toggle();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        events={mockEvents}
        eventClick={(info) => handleEventClick(info)}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "title prev,next",
          center: null,
          right: "today dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        height={800}
        contentHeight={780}
        eventContent={(e) => <EventView event={e} />}
        aspectRatio={3}
        editable={true}
        droppable={true}
      />

      <Modal isOpen={modalState} toggle={toggle} className="modal-md">
        <ModalHeader
          className={event.className && event.className}
          toggle={toggle}
        >
          {event.title && event.title}
          {event.faculty && event.faculty}
          getFacultyName(event.faculty )
        </ModalHeader>
        <Modal>
          <div className="gy-3 py-1">
            <div sm="6">
              <h6 className="overline-title">Start Time</h6>
              <p id="preview-event-start">
                {event.start && event.start.split("T")[0]}
              </p>
            </div>
            <div sm="6" id="preview-event-end-check">
              <h6 className="overline-title">End Time</h6>
              <p id="preview-event-end">
                {event.end && event.end.split("T")[0]}
              </p>
            </div>
            <div sm="10" id="preview-event-description-check">
              <h6 className="overline-title">Description</h6>
              <p id="preview-event-description">
                {event.description && event.description}
              </p>
            </div>
          </div>
          <ul className="d-flex justify-content-between gx-4 mt-3">
            <li>
              <Button
                color="primary"
                onClick={() => {
                  toggle();
                  toggleEdit();
                }}
              >
                Edit Class
              </Button>
            </li>
            <li>
              <Button color="danger" className="btn-dim" onClick={deleteAClass}>
                Delete
              </Button>
            </li>
          </ul>
        </Modal>
      </Modal>
      <Modal isOpen={edit} toggle={toggleEdit} className="modal-md">
        <ModalHeader toggle={toggleEdit}>Edit Class</ModalHeader>
        <ModalBody>
          {event.id && (
            <ClassForm
              toggleForm={toggleEdit}
              editClass={true}
              id={event.id.split("-")[3]}
            />
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default CalenderApp;
