import React from "react";
import { Card } from "antd";

const DashboardCard = ({ title, children, className = "", extra = null }) => {
  return (
    <Card
      title={title}
      className={`shadow-sm rounded-lg overflow-hidden ${className}`}
      extra={extra}
      bordered={false}
    >
      {children}
    </Card>
  );
};

export default DashboardCard;
