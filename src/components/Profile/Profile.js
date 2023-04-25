import React from "react";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

const Profile = ({ onSelectCard, onCreateModal, defaultClothingItems }) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        onSelectCard={onSelectCard}
        onCreateModal={onCreateModal}
        defaultClothingItems={defaultClothingItems}
      />
    </div>
  );
};
export default Profile;
