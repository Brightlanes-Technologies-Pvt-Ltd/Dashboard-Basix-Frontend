import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { read, utils } from "xlsx";
import Table from "../../components/Table/Table";
import { getClasses } from "../../utils/api/classApI/classApi";
import { setClass } from "../../redux/feateres/classSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { getCourses } from "../../utils/api/course_API";
import { all } from "axios";

const Personal = () => {
  const { user } = useSelector((state) => state.user);
  const [courses, setCourses] = useState([])
  const [title, setTitle] = useState(["courseName", "description", "startDate", "endDate", "enrolledStudents", "status"

  ]);

  const [data, setData] = useState();
  const [colDefs, setColDefs] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { data: { courses
        } } = await getCourses(user._id);
        setCourses([...courses])
        // dispatch(setClass(allClass.data.classes));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


  return (
    <>
      <Layout>
        <Table title={title} tableData={courses} />
      </Layout>
    </>
  );
};

export default Personal;
