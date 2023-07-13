import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

// import {whiteHeart} from "../../images/heartwhite.svg"
const ItemCard = ({ card, onSelectCard, onItemLike }) => {
  const user = useContext(CurrentUserContext);
  const isLiked = card.likes.some((userId) => {
    return userId === user._id || user._id === null;
  });
  const handleOnItemLike = () => {
    onItemLike({ _id: card._id, isLiked });
  };

  return (
    <div className="card_element">
      <div>
        <img
          src={card.imageUrl}
          className="card_image"
          onClick={() => onSelectCard(card)}
          alt={`${card.name}`}
        />
      </div>
      <div className="card_name">{card.name}</div>
      <div
        className={`card-like ${
          isLiked ? "card-liked-button-liked" : "card-liked-button-notliked"
        }`}
        onClick={handleOnItemLike}
      ></div>
    </div>
  );
};
export default ItemCard;
