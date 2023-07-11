import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  const user = useContext(CurrentUserContext);
  const handleDelete = () => {
    onDelete(selectedCard);
  };
  const isOwn = selectedCard.owner._id === user._id;
  const itemDeleteButtonClassName = `modal_item-deletebutton ${
    isOwn ? "modal_item-deletebutton_visible" : "modal_item-deletebutton_hidden"
  }`;
  return (
    <div className={`modal`}>
      <div className="modal_item-content">
        <button className=" modal_item-close" type="button" onClick={onClose} />
        <img
          className="modal_item-image"
          src={selectedCard.link}
          alt={selectedCard.name}
        />
        <div className="modal_item-infospace">
          <div>
            <div className="modal_item-name"> {selectedCard.name}</div>
            <div className="modal_item-type">
              Weather type: {selectedCard.weather}
            </div>
          </div>
          <div>
            <button
              className={itemDeleteButtonClassName}
              type="button"
              onClick={handleDelete}
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemModal;
