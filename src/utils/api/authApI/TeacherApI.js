import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API}/teacher`;

export const Signup = async (userData) => {
  const url = `${baseUrl}/signup`;
  return await axios.post(
    url,
    { ...userData },
    {
      withCredentials: true,
    }
  );
};

export const getTeachersData = async (teacher_id) => {
  return await axios.get(`${baseUrl}/${teacher_id}`, {
    withCredentials: true,
  });
};

export const updateTeacherProfile = async (userData) => {
  return await axios.put(
    `${baseUrl}/update`,
    { ...userData },
    { withCredentials: true }
  );
};
