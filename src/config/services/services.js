import { getHeaders } from "../axios/axiosHeaders";
import { getRequest } from "./serviceFunctions";

export const getUsers = () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  return getRequest({ url });
};

export const getPosts = () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  return getRequest({ url });
};
