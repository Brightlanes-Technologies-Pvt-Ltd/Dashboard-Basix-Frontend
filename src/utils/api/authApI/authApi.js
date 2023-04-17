import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API}/user`;

export const LogIn = async (userData) => {
  const url = `${baseUrl}/signin`;

  return await axios.post(
    url,
    { ...userData },
    {
      withCredentials: true,
    }
  );
};

export const getFaculty = async () => {
  const url = `${baseUrl}/faculty`;

  return await axios.get(url, { withCredentials: true });
};

export const logOut = async () => {
  const url = `${baseUrl}/logout`;
  return await axios.get(url, { withCredentials: true });
};

export const teacherLogIn = async (userData) => {
  const url = `${process.env.REACT_APP_API}/teacher/signin`;

  return await axios.post(
    url,
    { ...userData },
    {
      withCredentials: true,
    }
  );
};
