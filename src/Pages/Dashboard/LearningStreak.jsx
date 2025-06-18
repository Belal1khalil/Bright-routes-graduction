import React from "react";
import { Calendar, Typography, Tooltip, Badge } from "antd";
import { FireFilled } from "@ant-design/icons";
import DashboardCard from "./DashboardCard";

const { Text, Title } = Typography;

const LearningStreak = () => {
  // Mock data - replace with actual data from API
  const currentStreak = 7;
  const longestStreak = 14;

  // Mock learning activity data - this would come from your API
  const learningDays = {
    "2023-06-01": 45, // minutes spent
    "2023-06-02": 30,
    "2023-06-03": 75,
    "2023-06-05": 60,
    "2023-06-06": 90,
    "2023-06-07": 45,
    "2023-06-08": 30,
    "2023-06-09": 60,
    "2023-06-12": 45,
    "2023-06-13": 30,
    "2023-06-14": 90,
    "2023-06-16": 120,
  };

  // Function to determine cell styling based on learning activity
  const dateCellRender = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    const minutes = learningDays[dateString];

    if (!minutes) return null;

    let color = "green";
    if (minutes < 30) color = "#52c41a"; // light green
    else if (minutes < 60) color = "#1677ff"; // blue
    else if (minutes < 90) color = "#722ed1"; // purple
    else color = "#eb2f96"; // pink

    return (
      <Tooltip title={`${minutes} minutes of learning`}>
        <Badge
          color={color}
          count={""}
          size="default"
          style={{ marginRight: 4 }}
        />
      </Tooltip>
    );
  };

  // Function to render month-level learning summary
  const monthCellRender = (date) => {
    const month = date.format("YYYY-MM");
    const daysInMonth = Object.keys(learningDays).filter((day) =>
      day.startsWith(month)
    );

    if (daysInMonth.length === 0) return null;

    const totalMinutes = daysInMonth.reduce(
      (total, day) => total + learningDays[day],
      0
    );
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10; // Round to 1 decimal place

    return (
      <div className="text-center">
        <Text type="secondary">{totalHours} hours</Text>
      </div>
    );
  };

  return (
    <DashboardCard title="Learning Streak">
      <div className="flex items-center justify-between mb-4 px-4">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <FireFilled className="text-orange-500 text-2xl mr-2" />
            <Title level={2} className="m-0" style={{ color: "#fa8c16" }}>
              {currentStreak}
            </Title>
          </div>
          <Text>Current Streak</Text>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center">
            <FireFilled className="text-orange-500 text-2xl mr-2" />
            <Title level={2} className="m-0" style={{ color: "#fa8c16" }}>
              {longestStreak}
            </Title>
          </div>
          <Text>Longest Streak</Text>
        </div>
      </div>

      <div className="px-2">
        <Calendar
          fullscreen={false}
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
        />
      </div>

      <div className="mt-4 px-4">
        <Text type="secondary">
          <FireFilled className="text-orange-500 mr-1" />
          Learn every day to build your streak! Your longest streak is{" "}
          {longestStreak} days.
        </Text>
      </div>
    </DashboardCard>
  );
};

export default LearningStreak;
