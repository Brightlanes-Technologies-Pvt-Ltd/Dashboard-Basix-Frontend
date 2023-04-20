import axios from "axios";
const baseUrl = `${process.env.REACT_APP_API}/topic`;

export const createTopic = async (topicData) => {
  const url = `${baseUrl}/create`;

  return await axios.post(
    url,
    { ...topicData },
    {
      withCredentials: true,
    }
  );
};

export const getAllTopicsOfAClass = async (classId) => {
  const url = `${baseUrl}/${classId}`;
  return await axios.get(url, {
    withCredentials: true,
  });
};

export const updateTopic = async (topicData, topicId) => {
  const url = `${baseUrl}/update/${topicId}`;
  return await axios.put(
    url,
    { ...topicData },
    {
      withCredentials: true,
    }
  );
};

export const getATopicbyId = async (topicId) => {
  const url = `${baseUrl}/getsingletopic/${topicId}`;
  return await axios.get(url, {
    withCredentials: true,
  });
};
