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
