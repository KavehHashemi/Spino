import { createSlice } from "@reduxjs/toolkit";

type ConversationState = {
  currentConversation: string | null;
  currentConversationName: string | null;
};

const initialState: ConversationState = {
  currentConversation: null,
  currentConversationName: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload.id;
      state.currentConversationName = action.payload.name;
    },
  },
});
export const { setCurrentConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
