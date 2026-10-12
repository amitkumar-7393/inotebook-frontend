import React, { useContext } from "react";
import noteContext from "../context/noteContext";

const Alert = () => {
  const { alert } = useContext(noteContext);

  if (!alert) {
    return null;
  }

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <div className="container-fluid" style={{ minHeight: "50px" }}>
      <div className={`alert alert-${alert.type} py-2`} role="alert">
        <strong>{capitalize(alert.type)}:</strong> {alert.message}
      </div>
    </div>
  );
};

export default Alert;
