import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationID: String,
  date: String,
  isAI: Boolean,
  text: String,
});
export const Message = mongoose.model("Message", messageSchema);

const conversationSchema = new mongoose.Schema({
  userID: String,
  startDate: String,
  lastDate: String,
  title: String,
});

export const Conversation = mongoose.model("Conversation", conversationSchema);

const userSchema = new mongoose.Schema({
  id: String,
  creationDate: String,
});

export const User = mongoose.model("User", userSchema);
