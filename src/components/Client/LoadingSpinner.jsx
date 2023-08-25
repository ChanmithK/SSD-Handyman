import React from "react";
import "./spinner.css";

export default function LoadingSpinner(props) {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      <p className="spinner-text">{props.message}</p>
    </div>
  );
}
