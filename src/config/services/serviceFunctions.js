import axiosInstance from "../axios/axiosInstance";

export const getRequest = async ({ url, headers }) => {
  try {
    const response = await axiosInstance.get(url);
    return response;
  } catch (error) {
    return error;
  }
};
