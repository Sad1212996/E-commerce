import React from "react";
import "./style.css";

const Preloader = ({ isLoading, logoUrl }) => {
  return (
    <div className={`preloader-overlay ${!isLoading ? "fade-out" : ""}`}>
      <div className="preloader-spinner-container">
        <div className="spinner-outer-ring"></div>
        <div className="spinner-inner-ring"></div>
        <div className="preloader-logo-box">
          {logoUrl ? (
            <img src={logoUrl} alt="Classy Bites" />
          ) : (
            <span className="text-xl font-bold text-red-500">CB</span>
          )}
        </div>
      </div>

      <div className="preloader-text-brand">CLASSY BITES</div>

      <div className="preloader-progress-bar">
        <div className="preloader-progress-fill"></div>
      </div>

      <p className="text-xs text-gray-400 mt-3 font-medium tracking-wide">
        Preparing your shopping experience...
      </p>
    </div>
  );
};

export default Preloader;
