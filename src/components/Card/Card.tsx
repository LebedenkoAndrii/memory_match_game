import React from "react";
import cardStyles from "./Card.module.css";

interface Card {
  src: string;
  matched: boolean;
  id: number;
}

interface Props {
  card: Card;
  handleChoice: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
}

const MemoryCard: React.FC<Props> = ({
  card,
  handleChoice,
  flipped,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={cardStyles.card}>
      <div className={`${flipped ? cardStyles.flipped : "-"}`}>
        <img className={cardStyles.front} src={card.src} alt="card-front" />
        <img
          className={cardStyles.back}
          src="/public/img/cover.jpeg"
          onClick={handleClick}
          alt="card-back"
        />
      </div>
    </div>
  );
};

export default MemoryCard;
