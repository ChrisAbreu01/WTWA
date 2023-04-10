import "./ItemCard.css";
const ItemCard = ({ card, onSelectCard }) => {
  return (
    <div className="card_element">
      <div>
        <img
          src={card.link}
          className="card_image"
          onClick={() => onSelectCard(card)}
          alt="item"
        />
      </div>
      <div className="card_name">{card.name}</div>
    </div>
  );
};
export default ItemCard;
