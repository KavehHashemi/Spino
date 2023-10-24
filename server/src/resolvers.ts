import { GraphQLError } from "graphql";
import { User, Conversation, Message } from "./mongoose.js";
import { BuildMessageType, QA } from "./AI/QA.js";
import { QATool } from "./AI/QATool.js";

type CTXType = {
  auth: {
    isAuthenticated: boolean;
    token: String;
  };
};

export const resolvers = {
  Query: {
    user: async (parent: any, userID: String, context: CTXType) => {
      if (!context.auth.isAuthenticated) {
        throw new GraphQLError("User Not Authenticated");
      } else {
        return await User.find({ id: userID });
      }
    },
    conversations: async (_, { userID }) => {
      return await Conversation.find({ userID: userID });
    },
    messages: async (_, { conversationID }) => {
      return await Message.find({ conversationID: conversationID });
    },
    question: async (_, { question, conversationID }) => {
      let now = Date.now().toString();
      // let msgs = await Message.find({ conversationID: conversationID });
      // const messages: { message: string; isAI: boolean }[] = [];
      // msgs.forEach((msg) => {
      //   messages.push({ message: msg.text, isAI: msg.isAI });
      // });

      // const QAInstance = await QA.build(messages);
      // console.log("instance code is ", QAInstance.code);

      const QAInstance = await QA.normalBuild();

      const AIAnswer = (await QAInstance.ask(question)).text;
      const newAIMessage = new Message({
        conversationID: conversationID,
        date: now,
        isAI: true,
        text: AIAnswer,
      });
      return newAIMessage;
    },
  },
  Mutation: {
    addUser: async (_, { userID }) => {
      let now = Date.now().toString();
      const newUser = new User({
        id: userID,
        creationDate: now,
      });
      await newUser.save();
      return newUser;
    },

    addConversation: async (_, { userID, title }) => {
      let now = Date.now().toString();
      const newConvo = new Conversation({
        userID: userID,
        startDate: now,
        lastDate: now,
        title: title,
      });
      await newConvo.save();
      return newConvo;
    },

    addMessage: async (_, { conversationID, isAI, text }) => {
      let now = Date.now().toString();
      const newMsg = new Message({
        conversationID: conversationID,
        date: now,
        isAI: isAI,
        text: text,
      });
      await newMsg.save();
      return newMsg;
    },

    editConversation: async (_, { conversationID }) => {
      let now = Date.now().toString();
      let result = await Conversation.updateOne(
        { _id: conversationID },
        { $set: { lastDate: now } }
      );
      if (result.acknowledged && result.modifiedCount === 1) {
        return await Conversation.findOne({ _id: conversationID });
      }
    },

    deleteMessages: async (_, { conversationID }) => {
      let result = await Message.deleteMany({ conversationID: conversationID });
      if (result.acknowledged && result.deletedCount > 0) {
        console.log("deleted", result.deletedCount, "messages");
        return conversationID;
      }
      return null;
    },

    deleteConversation: async (_, { conversationID }) => {
      let result = await Conversation.deleteOne({ _id: conversationID });
      if (result.acknowledged && result.deletedCount === 1) {
        return await conversationID;
      }
      return null;
    },
  },
};
