import { createSlice } from "@reduxjs/toolkit";
import { heros } from "../mock/cards";
const initialState = {
    cards: heros,
};
export const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        addCard: (state, action) => {
            state.cards.push(action.payload);
        },
        editCard: (state, action) => {
            const CardToEdit = action.payload;
            const index = state.cards.findIndex((c) => c.id === action.payload.id);
            state.cards[index] = CardToEdit;
        },
        deleteCard: (state, action) => {
            const index = state.cards.findIndex((c) => c.id === action.payload);
            state.cards.splice(index, 1);
        },
        toggleFavorite: (state, { payload }) => {
            const index = state.cards.findIndex((a) => a.id === payload);
            if (index !== -1) {
                state.cards[index].isfavorite = !state.cards[index].isfavorite;
            }
        },
    },
});
export const { addCard, deleteCard, editCard, toggleFavorite } = cardsSlice.actions;
export default cardsSlice.reducer;
