import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content" id="modal_item-content">
        <button
          className="modal_close"
          id="modal_item-close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="modal_item-image" src={selectedCard.link} />
        <div className="modal_item-name"> {selectedCard.name}</div>
        <div className="modal_item-type">
          {" "}
          Weather type: {selectedCard.weather}
        </div>
      </div>
    </div>
  );
};
export default ItemModal;
