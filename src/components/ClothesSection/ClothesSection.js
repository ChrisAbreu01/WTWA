import React from "react";
import ItemCard from "../ItemCard/ItemCard";
// import { defaultClothingItems } from "../../utils/constants";
import "./ClothesSection.css";

const ClothesSection = ({
  onSelectCard,
  onCreateModal,
  defaultClothingItems,
}) => {
  return (
    <div className="clothessection">
      <div className="clothessection-buttons">
        <div className="clothessection-youritems">
          <button className="clothessection-button">Your items</button>
        </div>
        <div className="clothessection-addnew">
          <button
            className="clothessection-button"
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
            key={element._id.toString()}
          />
        ))}
      </div>
    </div>
  );
};
export default ClothesSection;
