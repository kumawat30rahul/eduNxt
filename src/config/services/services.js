import { mockActivities } from "../../components/laravelMigrationComponents/mockData/mockActivities";
import {
  mockChartData,
  mockQuarterlyChartData,
  mockWeeklyChartData,
  userChartData,
  userQuarterlyChartData,
  userWeeklyChartData,
} from "../../components/laravelMigrationComponents/mockData/mockChartData";
import { mockStats } from "../../components/laravelMigrationComponents/mockData/mockStats";
import { getRequest } from "./serviceFunctions";

export const getUsers = () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  return getRequest({ url });
};

export const getPosts = () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  return getRequest({ url });
};

export const getProducts = () => {
  const url = "https://dummyjson.com/products";
  return getRequest({ url });
};

export const getComments = () => {
  const url = "https://dummyjson.com/comments";
  return getRequest({ url });
};

export const getActivites = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: mockActivities,
      });
    }, 1000);
  });
};

export const getStats = () => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          status: 200,
          data: mockStats,
        }),
      1000
    );
  });
};

export const getChart = (period) => {
  const chartData =
    period === "week"
      ? mockWeeklyChartData
      : period === "month"
      ? mockChartData
      : mockQuarterlyChartData;
  const userGrowth =
    period === "week"
      ? userWeeklyChartData
      : period === "month"
      ? userChartData
      : userQuarterlyChartData;
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve({
          status: 200,
          data: {
            revenueChart: chartData,
            userGrowthChart: userGrowth,
          },
        }),
      1000
    );
  });
};
