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
