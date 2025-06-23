import * as Chart from "chart.js";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getActivites,
  getChart,
  getStats,
} from "../../config/services/services";
import { useFetch } from "../../hooks/useFetch";
import ActivityItem from "./ActivityItem";
import DateRangePicker from "./DateRangePicker";
import StatCard from "./StatCard";
import "./laravel.css";
import SkeletonLoader from "../skeletonLoader";
import BackButton from "../backButton/BackButton";

const AnalyticsDashboard = () => {
  const [period, setPeriod] = useState("week");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const userChartRef = useRef(null);
  const userChartInstance = useRef(null);

  const {
    data: activityData,
    error: activityError,
    loading: activityLoading,
    setRefetch: activityRefetch,
  } = useFetch(getActivites);

  const {
    data: statsData,
    error: statsError,
    loading: statsLoading,
    setRefetch: statsRefetch,
  } = useFetch(getStats);

  const {
    data: chartData,
    error: chartError,
    loading: chartLoading,
    setRefetch: chartRefetch,
  } = useFetch(getChart, period);

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: "Monthly Revenue Chart",
        font: {
          size: 16,
        },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  useEffect(() => {
    // Register all necessary Chart.js components (only needs to be done once)
    Chart.Chart.register(
      Chart.CategoryScale,
      Chart.LinearScale,
      Chart.PointElement,
      Chart.LineElement,
      Chart.LineController,
      Chart.BarElement,
      Chart.BarController,
      Chart.Title,
      Chart.Tooltip,
      Chart.Legend,
      Chart.Filler
    );

    // Create Revenue Chart
    if (chartData && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new revenue chart
      chartInstance.current = new Chart.Chart(ctx, {
        type: "line",
        data: chartData?.revenueChart,
        options: chartOptions,
      });
    }

    // Create User Chart (if you have user data)
    if (userChartRef.current) {
      const userCtx = userChartRef.current.getContext("2d");

      // Destroy existing user chart if it exists
      if (userChartInstance.current) {
        userChartInstance.current.destroy();
      }

      // Create user chart - you can modify this based on your user data

      const userChartOptions = {
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: "User Growth Chart",
            font: { size: 16 },
          },
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      userChartInstance.current = new Chart.Chart(userCtx, {
        type: "bar",
        data: chartData?.userGrowthChart,
        options: userChartOptions,
      });
    }

    // Cleanup function for both charts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      if (userChartInstance.current) {
        userChartInstance.current.destroy();
      }
    };
  }, [chartData]);

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    activityRefetch(uuidv4());
    chartRefetch(uuidv4());
    statsRefetch(uuidv4());
  };

  return (
    <div className="analytics-dashboard">
      <BackButton />
      <div className="dashboard-header">
        <h1>Analytics Overview</h1>
        <DateRangePicker value={period} onChange={handlePeriodChange} />
      </div>

      <div className="stats-grid">
        {statsLoading
          ? Array.from({ length: 4 })?.map((_, index) => (
              <SkeletonLoader height={"130px"} width={"100%"} />
            ))
          : statsData?.map((stat, index) => (
              <StatCard key={index} stat={stat} period={period} />
            ))}
      </div>
      <div className="charts-section">
        {chartLoading ? (
          <SkeletonLoader height={"300px"} width={"100%"} />
        ) : (
          <div className="chart-container">
            <h2>Revenue Trend</h2>
            {chartError ? (
              <div>Error loading chart</div>
            ) : (
              <canvas
                ref={chartRef}
                id="revenueChart"
                width="400"
                height="200"
              ></canvas>
            )}
          </div>
        )}
        {chartLoading ? (
          <SkeletonLoader height={"300px"} width={"100%"} />
        ) : (
          <div className="chart-container">
            <h2>User Growth</h2>
            {chartError ? (
              <div>Error loading chart</div>
            ) : (
              <canvas
                ref={userChartRef}
                id="userChart"
                width="400"
                height="200"
              ></canvas>
            )}
          </div>
        )}
      </div>

      {activityLoading ? (
        <SkeletonLoader height={"300px"} width={"100%"} />
      ) : (
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {activityData?.length > 0 ? (
              activityData?.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <p className="no-activity">No recent activity</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
