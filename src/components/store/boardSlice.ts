import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Card {
  src: string;
  matched: boolean;
  id: number;
}

interface BoardState {
  cards: Card[];
  turns: number;
  choiceOne: Card | null;
  choiceTwo: Card | null;
  disabled: boolean;
}

const initialState: BoardState = {
  cards: [],
  turns: 0,
  choiceOne: null,
  choiceTwo: null,
  disabled: false,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    loadCards: (state, action: PayloadAction<Card[]>) => {
      state.cards = action.payload;
    },
    shuffleCards: (state, action: PayloadAction<Card[]>) => {
      const duplicatedCards = action.payload.flatMap((card) => [card, card]); // Дублюємо кожну карту

      const shuffledCards = duplicatedCards
        .map((card, index) => ({ ...card, id: index + 1 })) // Додаємо ідентифікатори карти
        .sort(() => Math.random() - 0.5); // Перемішуємо карти

      state.choiceOne = null;
      state.choiceTwo = null;
      state.cards = shuffledCards;
      state.turns = 0;
    },
    handleChoice: (state, action: PayloadAction<Card>) => {
      state.choiceOne
        ? (state.choiceTwo = action.payload)
        : (state.choiceOne = action.payload);
    },
    resetTurn: (state) => {
      state.choiceOne = null;
      state.choiceTwo = null;
      state.turns++;
      state.disabled = false;
    },
    disableCards: (state) => {
      state.disabled = true;
    },
    enableCards: (state) => {
      state.disabled = false;
    },
    matchCards: (state) => {
      state.cards = state.cards.map((card) => {
        if (card.src === state.choiceOne!.src) {
          return { ...card, matched: true };
        } else {
          return card;
        }
      });
    },
  },
});

export const {
  loadCards,
  shuffleCards,
  handleChoice,
  resetTurn,
  disableCards,
  enableCards,
  matchCards,
} = boardSlice.actions;

export default boardSlice.reducer;
