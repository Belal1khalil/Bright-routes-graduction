import React, { useState } from "react";
import { List, Button, Input, Form, Modal, Progress, Tooltip, Tag } from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import DashboardCard from "./DashboardCard";

const LearningGoals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      text: "Complete React course",
      progress: 75,
      deadline: "2023-07-15",
    },
    {
      id: 2,
      text: "Build a portfolio project",
      progress: 30,
      deadline: "2023-08-30",
    },
    {
      id: 3,
      text: "Learn TypeScript basics",
      progress: 100,
      deadline: "2023-06-01",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [form] = Form.useForm();

  const showModal = (goal = null) => {
    setEditingGoal(goal);
    form.resetFields();

    if (goal) {
      form.setFieldsValue({
        text: goal.text,
        progress: goal.progress,
        deadline: goal.deadline,
      });
    }

    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingGoal(null);
  };

  const handleSubmit = (values) => {
    if (editingGoal) {
      // Update existing goal
      setGoals(
        goals.map((goal) =>
          goal.id === editingGoal.id ? { ...goal, ...values } : goal
        )
      );
    } else {
      // Add new goal
      const newGoal = {
        id: Date.now(),
        ...values,
        progress: values.progress || 0,
      };
      setGoals([...goals, newGoal]);
    }

    setIsModalVisible(false);
    setEditingGoal(null);
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const getTagColor = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysUntilDeadline = Math.ceil(
      (deadlineDate - today) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDeadline < 0) return "error";
    if (daysUntilDeadline < 7) return "warning";
    if (daysUntilDeadline < 14) return "processing";
    return "success";
  };

  return (
    <DashboardCard
      title="Learning Goals"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add Goal
        </Button>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={goals}
        renderItem={(goal) => (
          <List.Item
            actions={[
              <Tooltip title="Edit">
                <Button
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() => showModal(goal)}
                />
              </Tooltip>,
              <Tooltip title="Delete">
                <Button
                  icon={<DeleteOutlined />}
                  size="small"
                  danger
                  onClick={() => deleteGoal(goal.id)}
                />
              </Tooltip>,
            ]}
          >
            <List.Item.Meta
              title={
                <div className="flex items-center">
                  {goal.text}
                  {goal.progress === 100 && (
                    <CheckOutlined className="ml-2 text-green-500" />
                  )}
                </div>
              }
              description={
                <div>
                  <Progress
                    percent={goal.progress}
                    size="small"
                    status={goal.progress === 100 ? "success" : "active"}
                  />
                  <div className="mt-1 flex items-center">
                    <FlagOutlined className="mr-1" />
                    <span className="mr-2">Deadline:</span>
                    <Tag color={getTagColor(goal.deadline)}>
                      {new Date(goal.deadline).toLocaleDateString()}
                    </Tag>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />

      <Modal
        title={editingGoal ? "Edit Goal" : "Add New Goal"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ progress: 0 }}
        >
          <Form.Item
            name="text"
            label="Goal"
            rules={[{ required: true, message: "Please enter your goal" }]}
          >
            <Input placeholder="What do you want to achieve?" />
          </Form.Item>

          <Form.Item
            name="progress"
            label="Progress (%)"
            rules={[
              { required: true, message: "Please enter progress" },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Progress must be between 0 and 100",
              },
            ]}
          >
            <Input type="number" min={0} max={100} />
          </Form.Item>

          <Form.Item
            name="deadline"
            label="Deadline"
            rules={[{ required: true, message: "Please select a deadline" }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end">
              <Button className="mr-2" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingGoal ? "Update" : "Add"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </DashboardCard>
  );
};

export default LearningGoals;
