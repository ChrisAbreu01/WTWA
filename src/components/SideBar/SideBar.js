import React from "react";
import avatarImage from "../../images/avatar.svg";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_avatar">
        <img src={avatarImage} alt="avatar" className="sidebar_avatar-image" />
      </div>
      <div className="sidebar_name">
        <p className="sidebar_name-text">Terrence Tegegne</p>
      </div>
    </div>
  );
};
export default SideBar;
