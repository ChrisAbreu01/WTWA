import React from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

const Profile = ({ onSelectCard }) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection onSelectCard={onSelectCard} />
    </div>
  );
};
export default Profile;
