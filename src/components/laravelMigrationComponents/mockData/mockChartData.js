export const mockChartData = {
  labels: ["1", "5", "10", "15", "20", "25", "30"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 15000, 25000, 22000, 30000, 10000],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

export const mockWeeklyChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Revenue",
      data: [4000, 6000, 5500, 7000, 3000, 2000, 5600],
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

export const mockQuarterlyChartData = {
  labels: ["April", "May", "June"],
  datasets: [
    {
      label: "Revenue",
      data: [46000, 77000, 50000], // Sum or estimate based on monthly
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

export const userQuarterlyChartData = {
  labels: ["April", "May", "June"],
  datasets: [
    {
      label: "User Growth",
      data: [350, 670, 500],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
      type: "bar",
    },
  ],
};

export const userWeeklyChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "User Growth",
      data: [30, 45, 55, 70, 80, 100, 88],
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
      type: "bar",
    },
  ],
};

export const userChartData = {
  labels: ["1", "5", "10", "15", "20", "25", "30"],
  datasets: [
    {
      label: "User Growth",
      data: [50, 120, 280, 250, 320, 400, 200], // Replace with actual user data
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
      type: "bar",
    },
  ],
};
