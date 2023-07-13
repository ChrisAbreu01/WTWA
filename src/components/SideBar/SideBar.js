import React from "react";
import avatarImage from "../../images/avatar.svg";
import "./SideBar.css";

const SideBar = (props) => {
  return (
    <div className="sidebar">
      <div className="sidebar_avatar">
        <img src={avatarImage} alt="avatar" className="sidebar_avatar-image" />
        <p className="sidebar_name-text">{props.user.name}</p>
      </div>
      <button onClick={props.userOpenEditProfile} className="sidebar__button">
        Change Profile Data
      </button>
      <button onClick={props.signOut} className="sidebar-logout">
        Log out
      </button>
    </div>
  );
};
export default SideBar;
