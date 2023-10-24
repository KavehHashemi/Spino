import { configureStore } from "@reduxjs/toolkit";

import modeReducer from "./mode";
import conversationReducer from "./conversation";

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    conversation: conversationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
