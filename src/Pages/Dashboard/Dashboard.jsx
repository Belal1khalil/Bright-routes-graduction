import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Column, Line } from "@ant-design/charts";
import {
  Card,
  Row,
  Col,
  Statistic,
  Tabs,
  Progress,
  Badge,
  List,
  Avatar,
  Spin,
  Alert,
} from "antd";
import {
  BookOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  RiseOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../Context/UserContext";
import PerformanceSummary from "./PerformanceSummary";
import LearningGoals from "./LearningGoals";
import LearningStreak from "./LearningStreak";
import DashboardCard from "./DashboardCard";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [courseData, setCourseData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const { token } = useContext(UserContext);

  useEffect(() => {
    // Fetch user data
    if (token) {
      getUserData();
    }
  }, [token]);

  // Function to fetch user data
  const getUserData = async () => {
    try {
      const response = await axios.get(
        "https://brightminds.runasp.net/api/Account/UserProfile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(response.data.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    // In a real application, you would fetch data from your API
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // Mock data for demonstration - replace with actual API calls
        // Fetch course progress
        const mockCourseData = [
          { course: "Web Development", progress: 78 },
          { course: "Data Science", progress: 45 },
          { course: "Mobile App Development", progress: 62 },
          { course: "UI/UX Design", progress: 90 },
        ];
        setCourseData(mockCourseData);

        // Fetch progress over time
        const mockProgressData = [
          { month: "Jan", progress: 20 },
          { month: "Feb", progress: 35 },
          { month: "Mar", progress: 45 },
          { month: "Apr", progress: 50 },
          { month: "May", progress: 65 },
          { month: "Jun", progress: 78 },
        ];
        setProgressData(mockProgressData);

        // Fetch recent activities
        const mockActivities = [
          {
            id: 1,
            type: "Course Completion",
            course: "HTML & CSS Basics",
            date: "2023-06-10",
          },
          {
            id: 2,
            type: "Quiz Taken",
            course: "JavaScript Fundamentals",
            score: "85%",
            date: "2023-06-08",
          },
          {
            id: 3,
            type: "New Course Started",
            course: "React for Beginners",
            date: "2023-06-05",
          },
          {
            id: 4,
            type: "Certificate Earned",
            course: "Responsive Web Design",
            date: "2023-06-01",
          },
        ];
        setRecentActivities(mockActivities);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Chart configurations
  const courseProgressConfig = {
    data: courseData,
    xField: "course",
    yField: "progress",
    color: "#6366f1",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    meta: {
      progress: {
        alias: "Progress (%)",
      },
    },
  };

  const progressOverTimeConfig = {
    data: progressData,
    xField: "month",
    yField: "progress",
    point: {
      size: 5,
      shape: "diamond",
    },
    color: "#10b981",
    meta: {
      progress: {
        alias: "Overall Progress (%)",
        min: 0,
        max: 100,
      },
    },
  };

  const recentCoursesData = [
    {
      id: 1,
      title: "Advanced JavaScript",
      progress: 45,
      image: "https://via.placeholder.com/40",
      lastAccessed: "2023-06-18",
    },
    {
      id: 2,
      title: "React Native Mastery",
      progress: 23,
      image: "https://via.placeholder.com/40",
      lastAccessed: "2023-06-15",
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      progress: 67,
      image: "https://via.placeholder.com/40",
      lastAccessed: "2023-06-12",
    },
  ];

  const tabItems = [
    {
      key: "1",
      label: "Overview",
      children: (
        <div className="mt-4">
          {error && (
            <Alert message={error} type="error" showIcon className="mb-4" />
          )}

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Courses Enrolled"
                  value={4}
                  prefix={<BookOutlined />}
                  valueStyle={{ color: "#6366f1" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Hours Spent"
                  value={127}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: "#10b981" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Certificates"
                  value={2}
                  prefix={<TrophyOutlined />}
                  valueStyle={{ color: "#f59e0b" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-sm">
                <Statistic
                  title="Overall Progress"
                  value={68}
                  suffix="%"
                  prefix={<RiseOutlined />}
                  valueStyle={{ color: "#3b82f6" }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-4">
            <Col xs={24} md={16}>
              <DashboardCard title="Recent Courses">
                <List
                  itemLayout="horizontal"
                  dataSource={recentCoursesData}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item.image} />}
                        title={item.title}
                        description={
                          <div>
                            <Progress
                              percent={item.progress}
                              status={
                                item.progress === 100 ? "success" : "active"
                              }
                              size="small"
                            />
                            <div className="text-xs text-gray-500 mt-1">
                              Last accessed:{" "}
                              {new Date(item.lastAccessed).toLocaleDateString()}
                            </div>
                          </div>
                        }
                      />
                      <div>
                        <Badge
                          count={`${item.progress}%`}
                          style={{
                            backgroundColor:
                              item.progress > 75 ? "#52c41a" : "#faad14",
                          }}
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </DashboardCard>
            </Col>

            <Col xs={24} md={8}>
              <DashboardCard title="Quick Stats">
                <div className="p-2">
                  <div className="flex justify-between items-center mb-4">
                    <span>Quizzes Completed:</span>
                    <Badge count={12} style={{ backgroundColor: "#1677ff" }} />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span>Discussion Participation:</span>
                    <Badge count={24} style={{ backgroundColor: "#722ed1" }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Courses Completed:</span>
                    <Badge count={2} style={{ backgroundColor: "#eb2f96" }} />
                  </div>
                </div>
              </DashboardCard>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-4">
            <Col xs={24} lg={24}>
              <DashboardCard title="Course Progress">
                <Column {...courseProgressConfig} />
              </DashboardCard>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-4">
            <Col xs={24}>
              <DashboardCard title="Learning Progress Over Time">
                <Line {...progressOverTimeConfig} />
              </DashboardCard>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "2",
      label: "Performance",
      children: (
        <div className="mt-4">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <PerformanceSummary />
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mt-4">
            <Col xs={24} lg={12}>
              <DashboardCard title="Quiz Results">
                <List
                  dataSource={[
                    {
                      quiz: "JavaScript Basics",
                      score: 85,
                      date: "2023-06-10",
                    },
                    { quiz: "CSS and HTML", score: 92, date: "2023-06-05" },
                    {
                      quiz: "React Fundamentals",
                      score: 78,
                      date: "2023-05-28",
                    },
                    { quiz: "Node.js Basics", score: 65, date: "2023-05-20" },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <BulbOutlined
                            style={{ fontSize: 24, color: "#faad14" }}
                          />
                        }
                        title={item.quiz}
                        description={`Taken on ${new Date(
                          item.date
                        ).toLocaleDateString()}`}
                      />
                      <div>
                        <Badge
                          count={`${item.score}%`}
                          style={{
                            backgroundColor:
                              item.score >= 90
                                ? "#52c41a"
                                : item.score >= 70
                                ? "#faad14"
                                : "#f5222d",
                          }}
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </DashboardCard>
            </Col>

            <Col xs={24} lg={12}>
              <DashboardCard title="Improvement Areas">
                <List
                  dataSource={[
                    { area: "Backend Development", proficiency: 35 },
                    { area: "Data Structures", proficiency: 45 },
                    { area: "Algorithms", proficiency: 40 },
                    { area: "DevOps", proficiency: 20 },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.area}
                        description={
                          <Progress
                            percent={item.proficiency}
                            size="small"
                            strokeColor={{
                              "0%": "#ff4d4f",
                              "100%": "#ff7a45",
                            }}
                          />
                        }
                      />
                    </List.Item>
                  )}
                />
              </DashboardCard>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "3",
      label: "Activities",
      children: (
        <div className="mt-4">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <DashboardCard title="Learning Activities">
                <List
                  itemLayout="horizontal"
                  dataSource={recentActivities}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{
                              backgroundColor:
                                item.type === "Course Completion"
                                  ? "#52c41a"
                                  : item.type === "Quiz Taken"
                                  ? "#1890ff"
                                  : item.type === "New Course Started"
                                  ? "#722ed1"
                                  : "#faad14",
                            }}
                          >
                            {item.type.charAt(0)}
                          </Avatar>
                        }
                        title={item.type}
                        description={
                          <div>
                            <div>
                              <strong>{item.course}</strong>
                            </div>
                            {item.score && <div>Score: {item.score}</div>}
                            <div className="text-gray-500 text-sm">
                              {new Date(item.date).toLocaleDateString()}
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </DashboardCard>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "4",
      label: "Goals",
      children: (
        <div className="mt-4">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <LearningGoals />
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "5",
      label: "Streak",
      children: (
        <div className="mt-4">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <LearningStreak />
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>
          {userData?.firstName
            ? `${userData.firstName}'s Dashboard`
            : "Learning Dashboard"}
        </title>
      </Helmet>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {userData?.firstName
            ? `${userData.firstName}'s Dashboard`
            : "Learning Dashboard"}
        </h1>
        <p className="text-gray-600">
          Track your progress, courses, and learning statistics
        </p>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="dashboard-tabs"
      />
    </div>
  );
};

export default Dashboard;
