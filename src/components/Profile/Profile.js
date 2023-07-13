import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

const Profile = ({
  onSelectCard,
  onCreateModal,
  defaultClothingItems,
  onItemLike,
  openEditProfile,
  setUser,
}) => {
  const history = useHistory();
  const user = useContext(CurrentUserContext);
  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    history.push("/");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/");
    }
  }, [history]);
  return (
    <div className="profile">
      <SideBar
        user={user}
        signOut={signOut}
        OpenEditProfile={openEditProfile}
      />
      <ClothesSection
        onSelectCard={onSelectCard}
        onCreateModal={onCreateModal}
        defaultClothingItems={defaultClothingItems}
        onItemLike={onItemLike}
      />
    </div>
  );
};
export default Profile;
