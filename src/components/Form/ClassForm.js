import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";

import { eventOptions } from "../Calnedar/CalenderData";

// import { FaFileExport } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { setClass, updateClass } from "../../redux/feateres/classSlice";
import { getFaculty } from "../../utils/api/authApI/authApi";

import {
  adminUpdateAClassById,
  createClass,
  getAclassById,
} from "../../utils/api/classApI/classApi";

import { validateClassData } from "../../utils/Helpers/formValidation";
import { toast, ToastContainer } from "react-toastify";
import Button from "../Button/Button";
import SelectInputField from "../common/SelectField/SelectField";
import Input from "../common/Input/Input";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

const ClassForm = ({ toggleForm, editClass = false, id = null }) => {
  const navigate = useNavigate();
  const { user, classReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const initialErrors = {
    classNameError: { status: false, error: "" },
    facultyError: { status: false, error: "" },
    startDateError: { status: false, error: "" },
    endDateError: { status: false, error: "" },
    classHoursError: { status: false, error: "" },
    descriptionError: { status: false, error: "" },
    categoryError: { status: false, error: "" },
    agendasError: { status: false, error: "" },
  };

  const [faculty, setFaculty] = useState([]);

  const [checkboxes, setCheckboxes] = useState([
    { id: "secondCheckbox", label: "AWP", checked: false },
    { id: "thirdCheckbox", label: "Test", checked: false },
    {
      id: "fourthCheckbox",
      label: "Study Material Distributed",
      checked: false,
    },
    {
      id: "fifthCheckbox",
      label: "Mentorship",
      checked: false,
    },
  ]);
  const [defaultValue, setDefaultValue] = useState({
    faculty: "Select Faculty",
    category: "Select Category",
  });
  const [classData, setClassData] = useState({
    className: "",
    faculty: "",
    startDate: new Date(),
    endDate: new Date(),
    classHours: 0,
    description: "",
    category: "",
    agendas: [],
    startTime: new Date(),
    endTime: new Date(),
  });

  const [error, setError] = useState({ ...initialErrors });

  const getClassData = (e) => {
    setError({ ...initialErrors });
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const getAllfaculty = async () => {
    try {
      const { data } = await getFaculty();

      const allFaculty = data.allFaculty.map((value) => {
        return { value: value._id, name: value.name };
      });

      setFaculty([...allFaculty]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setError({ ...initialErrors });
    const start = new Date(classData.startDate);
    start.setHours(classData.startTime.getHours());
    start.setMinutes(classData.startTime.getMinutes());

    const end = new Date(classData.endDate);
    end.setHours(classData.endTime.getHours());
    end.setMinutes(classData.endTime.getMinutes());

    const diff = (end - start) / (1000 * 60 * 60); // Difference in hours
    setClassData({
      ...classData,
      classHours: diff,
      startDate: start,
      endDate: end,
    });
  }, [classData.startTime, classData.endTime]);

  useEffect(() => {
    getAllfaculty();
  }, []);

  const getFacultyName = (id) => {
    const data = faculty.filter((data) => data.value === id);

    return data[0].name;
  };

  const filterFaculty = (id) => {
    const newFaculties = faculty.filter((data) => data.value !== id);
    setFaculty([...newFaculties]);
  };

  const handleCheckboxChange = (e) => {
    if (classData.agendas.includes(e.target.value)) {
      const newAgendas = classData.agendas.filter((value) => {
        return e.target.value !== value;
      });
      const newCkeckBox = checkboxes.map((value) => {
        if (!newAgendas.includes(value.label)) {
          return { ...value, ckecked: false };
        } else {
          return value;
        }
      });

      setCheckboxes([...newCkeckBox]);

      setClassData({ ...classData, agendas: [...newAgendas] });
    } else {
      setClassData({
        ...classData,
        agendas: [...classData.agendas, e.target.value],
      });
      const newCkeckBox = checkboxes.map((value) => {
        if (classData.agendas.includes(value.label)) {
          return { ...value, ckecked: true };
        } else {
          return value;
        }
      });
      setCheckboxes([...newCkeckBox]);
    }
  };

  const updateCheckBoxes = () => {
    const newCkeckBoxes = checkboxes.map((value) => {
      if (classData.agendas.includes(value.label)) {
        console.log(value);
        return { ...value, checked: true };
      } else {
        return value;
      }
    });
    // console.log(newCkeckBoxes);
    setCheckboxes([...newCkeckBoxes]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { errors, success } = validateClassData(classData);

    if (success) {
      try {
        const { data } = await createClass(classData);

        dispatch(updateClass(data.class));
        toast.success(data.message, {
          autoClose: 1000,
        });
        setTimeout(() => {
          toggleForm();
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } else {
      setError({ ...error, ...errors });
    }
  };

  const updateAClass = async (e) => {
    e.preventDefault();
    const { errors, success } = validateClassData(classData);

    if (success) {
      try {
        const { data } = await adminUpdateAClassById(classData, id);

        //dispatch(updateClass(data.class));
        const filteredClasses = classReducer.class.filter(
          (value) => value._id !== id
        );
        filteredClasses.push(data.updatedClass);
        dispatch(setClass(filteredClasses));

        toggleForm();
      } catch (error) {
        console.log(error);
      }
    } else {
      setError({ ...error, ...errors });
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const {
            data: {
              data: {
                className,
                agendas,
                category,
                classHours,
                faculty,
                endDate,
                startDate,
                description,
              },
            },
          } = await getAclassById(id);

          setClassData({
            className,
            faculty,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            classHours,
            description,
            category,
            agendas,
            startTime: new Date(startDate),
            endTime: new Date(endDate),
          });
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [id]);

  useEffect(() => {
    if (id) {
      updateCheckBoxes();
    }
  }, [classData]);

  useEffect(() => {
    if (id && classData.faculty !== "") {
      const name = getFacultyName(classData.faculty);
      if (name) {
        filterFaculty(id);
        setDefaultValue({
          faculty: name,
          category: classData.category,
        });
      }
    }
  }, [id, classData.faculty]);

  return (
    <Layout
      heading={"Courses"}
      buttons={[
        {
          text: "Back",
          callback: navigateBack,
        },
      ]}
    >
      <form
        className="flex flex-col items-center justify-center gap-4"
        onSubmit={handleFormSubmit}
      >
        <ToastContainer />
        <div className=" ">
          <div>
            <Input
              type="text"
              name="className"
              label={"Class Name"}
              callback={getClassData}
              value={classData.className}
            />

            {error.classNameError.status ? (
              <p className="text-danger">{error.classNameError.error}</p>
            ) : (
              ""
            )}
          </div>

          <div className>
            <SelectInputField
              label={"Faculty Name"}
              options={faculty}
              defaultValue={defaultValue.faculty}
              callback={getClassData}
              name={"faculty"}
            />
            {error.facultyError.status ? (
              <p className="text-danger">{error.facultyError.error}</p>
            ) : (
              ""
            )}
          </div>

          <div>
            <div className="flex flex-row">
              <label className="block text-sm font-medium text-slate-700">
                Start Date &amp; Time
              </label>
              <div>
                <div>
                  <div>
                    <DatePicker
                      selected={classData.startDate}
                      onChange={(date) =>
                        setClassData({ ...classData, startDate: date })
                      }
                      className="border border-gray-300 dark:border-gray-700 w-28 text-center py-2 shadow-sm  rounded text-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  sm:text-sm focus:ring-1  placeholder-gray-500  "
                    />
                  </div>
                </div>
                <div>
                  <div className="flex flex-row">
                    <DatePicker
                      selected={classData.startTime}
                      onChange={(date) =>
                        setClassData({ ...classData, startTime: date })
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeCaption="Time"
                      dateFormat=" hh:mm aa"
                      className="border border-gray-300 dark:border-gray-700 w-28 text-center py-2 shadow-sm  rounded text-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  sm:text-sm focus:ring-1  placeholder-gray-500  "
                    />
                  </div>
                </div>
                {error.startDateError.status ? (
                  <p className="text-danger">{error.startDateError.error}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                End Date &amp; Time
              </label>
              <div>
                <div>
                  <div>
                    <DatePicker
                      selected={classData.endDate}
                      onChange={(date) =>
                        setClassData({ ...classData, endDate: date })
                      }
                      className="border border-gray-300 dark:border-gray-700 w-28 text-center py-2 shadow-sm  rounded text-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  sm:text-sm focus:ring-1  placeholder-gray-500  "
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <DatePicker
                      selected={classData.endTime}
                      onChange={(date) =>
                        setClassData({ ...classData, endTime: date })
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      dateFormat="hh:mm aa"
                      className="border border-gray-300 dark:border-gray-700 w-28 text-center py-2 shadow-sm  rounded text-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  sm:text-sm focus:ring-1  placeholder-gray-500  "
                    />
                  </div>
                </div>
                {error.endDateError.status ? (
                  <p className="text-danger">{error.endDateError.error}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              <div>
                <Input
                  type="number"
                  name={"classHours"}
                  value={classData.classHours}
                  label={"No. of Hours"}
                  disabled={true}
                />
              </div>
              {error.classHoursError.status ? (
                <p className="text-danger">{error.classHoursError.error}</p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Class Description
              </label>
              <div>
                <textarea
                  name="description"
                  value={classData.description}
                  onChange={getClassData}
                  className="mt-1 px-2 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 
       placeholder:text-sm
       focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1  "
                />
              </div>
              {error.descriptionError.status ? (
                <p className="text-danger">{error.descriptionError.error}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <div>
              <SelectInputField
                options={eventOptions}
                defaultValue={defaultValue.category}
                callback={getClassData}
                name={"category"}
                label={"Class Category"}
              />
              {error.categoryError.status ? (
                <p className="text-danger">{error.categoryError.error}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* --------------------------tick check box-------------------------------------- */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-slate-700">
              {" "}
              Agendas
            </label>
            <div>
              {" "}
              <ul className="flex gap-2">
                {checkboxes.map((checkbox) => (
                  <li key={checkbox.id}>
                    {/* <Input
                  className="form-check-Input me-1"
                  type="checkbox"
                  checked={checkbox.checked}
                  id={checkbox.id}
                  value={checkbox.label}
                  name={checkbox.label}
                  onClick={handleCheckboxChange}
                /> */}
                    <Input
                      label={checkbox.label}
                      type={"checkbox"}
                      name={checkbox.label}
                      value={checkbox.label}
                      callback={handleCheckboxChange}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <ul className="flex justify-between ">
              <li className="">
                {id === null ? (
                  <Button  callback={handleFormSubmit} text={"Add class"} />
                ) : (
                  <Button callback={updateAClass} text={"Update class"} />
                )}
              </li>
              <li>
                <Button
                  callback={updateAClass}
                  text={"Discard"}
                  color={"bg-red-600 "}
                  hover={"hover:bg-green-200"}
                />
              </li>
            </ul>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default ClassForm;
