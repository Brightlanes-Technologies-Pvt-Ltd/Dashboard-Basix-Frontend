import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API}/course`;

export const createClass = async courseData => {
	const url = `${baseUrl}/create`;

	return await axios.post(
		url,
		{ ...courseData },
		{
			withCredentials: true
		}
	);
};

export const getCourses = async teacherId => {
	return await axios.get(`${baseUrl}/${teacherId}`, {
		withCredentials: true
	});
};

export const getAllCourses = async () => {
	return await axios.get(baseUrl, {
		withCredentials: true
	});
};



export const getACoursesById = async courseId => {
	return await axios.get(`${baseUrl}/one/${courseId}`, {
		withCredentials: true
	});
};



export const createCourseFromCSV = async (courseData) => {
	const url = `${baseUrl}/create/csv`;
  
	return await axios.post(
	  url,
	  { file: courseData },
	  {
		headers: {
		  "content-Type": "multipart/form-data",
		},
		withCredentials: true,
	  }
	);
  };