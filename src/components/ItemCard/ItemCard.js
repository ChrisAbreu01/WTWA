import "./ItemCard.css";
const ItemCard = ({ card, onSelectCard, id }) => {
  console.log(id);
  return (
    <div className="card_element" key={id}>
      <div>
        <img
          src={card.link}
          className="card_image"
          onClick={() => onSelectCard(card)}
          alt={`iPhoto of ${card.name}`}
        />
      </div>
      <div className="card_name">{card.name}</div>
    </div>
  );
};
export default ItemCard;
