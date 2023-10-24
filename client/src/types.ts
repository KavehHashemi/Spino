export type MessageType = {
  id: string;
  conversationID: string;
  date: string;
  isAI: boolean;
  text: string;
};

export type ConversationType = {
  id: string;
  userID: string;
  startDate: string;
  lastDate: string;
  title: string;
};

export type UserType = {
  id: string;
  creationDate: string;
};
