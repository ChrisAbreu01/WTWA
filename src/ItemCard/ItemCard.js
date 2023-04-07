const ItemCard = ({ x }) => {
  return (
    <div>
      <div>
        <img src={x.link} className="card_image" />
      </div>{" "}
      <div className="card_name">{x.name}</div>
    </div>
  );
};
export default ItemCard;
