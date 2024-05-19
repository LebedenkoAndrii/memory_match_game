import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import boardStyles from "./Board.module.css";
import SingleCard from "../Card/Card";
import {
  loadCards,
  shuffleCards,
  handleChoice,
  resetTurn,
  disableCards,
  enableCards,
  matchCards,
} from "../store/boardSlice";

const cardImages: Card[] = [
  { src: "/img/deer.jpeg", matched: false, id: 1 },
  { src: "/img/deer_2.jpg", matched: false, id: 2 },
  { src: "/img/dog.jpg", matched: false, id: 3 },
  { src: "/img/fox.jpeg", matched: false, id: 4 },
  { src: "/img/leon.jpg", matched: false, id: 5 },
  { src: "/img/wolf.jpg", matched: false, id: 6 },
];

function Board() {
  const dispatch = useDispatch();
  const { cards, turns, choiceOne, choiceTwo, disabled } = useSelector(
    (state) => state.board
  );

  useEffect(() => {
    dispatch(loadCards(cardImages));
  }, []);

  useEffect(() => {
    dispatch(shuffleCards(cardImages));
  }, []);

  const handleCardClick = (card) => {
    if (!disabled) {
      dispatch(handleChoice(card));
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      dispatch(disableCards());
      if (choiceOne.src === choiceTwo.src) {
        dispatch(matchCards());
        dispatch(resetTurn());
      } else {
        setTimeout(() => {
          dispatch(enableCards());
          dispatch(resetTurn());
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className={boardStyles.board}>
      <h1>Memory match game</h1>
      <p>Match all the cards by matching a pair of cards</p>

      <div className={boardStyles.card_grid}>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleCardClick}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
      <button
        className={boardStyles.button}
        onClick={() => dispatch(shuffleCards(cardImages))}
      >
        New Game
      </button>
    </div>
  );
}

export default Board;
