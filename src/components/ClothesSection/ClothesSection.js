import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({
  onSelectCard,
  onCreateModal,
  defaultClothingItems,
  onItemLike,
}) => {
  return (
    <div className="clothessection">
      <div className="clothessection-buttons">
        <div className="clothessection-youritems">
          <button className="clothessection-button">Your items</button>
        </div>
        <div className="clothessection-addnew">
          <button
            className="clothessection-button clothessection-add-button"
            onClick={onCreateModal}
            type="button"
          >
            + Add new
          </button>
        </div>
      </div>
      <div className="clothessection-cards">
        {defaultClothingItems.map((element) => (
          <ItemCard
            card={element}
            onSelectCard={onSelectCard}
            key={element?._id?.toString()}
            onItemLike={onItemLike}
          />
        ))}
      </div>
    </div>
  );
};
export default ClothesSection;
