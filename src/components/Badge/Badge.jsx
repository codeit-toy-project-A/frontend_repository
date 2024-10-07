import React from "react";
import "./Badge.css";

const Badge = ({ icon, name }) => {
  return (
    <div className="badge">
      <span className="badge__icon">{icon}</span>
      <span className="badge__name">{name}</span>
    </div>
  );
};

export default Badge;
