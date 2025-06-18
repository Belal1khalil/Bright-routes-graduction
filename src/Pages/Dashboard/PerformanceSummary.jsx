import React from "react";
import { Row, Col, Progress, Card, Typography } from "antd";
import { ClockCircleFilled } from "@ant-design/icons";
import DashboardCard from "./DashboardCard";

const { Title, Text } = Typography;

const PerformanceSummary = ({ performance = {} }) => {
  // Use mock data if no data is provided
  const data = {
    quizAverage: performance.quizAverage || 78,
    timeSpent: performance.timeSpent || 127,
    ...performance,
  };

  return (
    <DashboardCard title="Performance Summary">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card className="bg-gray-50" bordered={false}>
            <Title level={4}>Quiz Scores</Title>
            <div className="flex justify-center mb-4">
              <Progress
                type="dashboard"
                percent={data.quizAverage}
                width={120}
                format={(percent) => `${percent}%`}
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
              />
            </div>
            <div className="text-center">
              <Text>Average Quiz Score</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card className="bg-gray-50" bordered={false}>
            <Title level={4}>Study Time</Title>
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2 text-blue-600">
                  {data.timeSpent}
                </div>
                <Text>Hours Spent Learning</Text>
                <div className="mt-2 text-gray-500 flex items-center justify-center">
                  <ClockCircleFilled className="mr-1" />
                  <span>This Month</span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </DashboardCard>
  );
};

export default PerformanceSummary;
