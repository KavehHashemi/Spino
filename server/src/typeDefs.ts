export const typeDefs = `#graphql

  type Message {
    id:ID
    conversationID: ID
    date:String
    isAI:Boolean
    text:String
  }

  type Conversation {
    id:ID
    userID:ID
    startDate:String
    lastDate:String
    title:String
    # QAInstance:String

  }

  type User {
    id: ID
    creationDate:String
  }

   type Query {
    user(userID:ID):User
    conversations(userID:ID):[Conversation]
    messages(conversationID:ID):[Message]
    question(question:String, conversationID:ID):Message
  }
  type Mutation {
    addUser(userID:ID):User
    addConversation(title:String, userID:ID):Conversation
    addMessage(isAI:Boolean, text:String, conversationID:ID):Message

    editConversation(conversationID:ID):Conversation  

    deleteConversation(conversationID:ID):ID
    deleteMessages(conversationID:ID):ID
    }
`;
