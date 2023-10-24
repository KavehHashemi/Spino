import { gql } from "@apollo/client";

///QUERIES
export const USER_QUERY = gql`
  query Query($userID: ID) {
    user(userID: $userID) {
      userID
      creationDate
    }
  }
`;

export const CONVERSATIONS_QUERY = gql`
  query Query($userID: ID) {
    conversations(userID: $userID) {
      id
      startDate
      lastDate
      userID
      title
    }
  }
`;

export const MESSAGES_QUERY = gql`
  query Query($conversationID: ID) {
    messages(conversationID: $conversationID) {
      id
      conversationID
      date
      isAI
      text
    }
  }
`;

export const QUESTION_QUERY = gql`
  query Query($question: String, $conversationID: ID) {
    question(question: $question, conversationID: $conversationID) {
      id
      conversationID
      date
      isAI
      text
    }
  }
`;

///MUTATIONS
export const ADD_USER = gql`
  mutation Mutation($userID: ID) {
    addUser(userID: $userID) {
      id
      creationDate
    }
  }
`;
export const ADD_CONVERSATION = gql`
  mutation Mutation($userID: ID, $title: String) {
    addConversation(userID: $userID, title: $title) {
      id
      userID
      startDate
      lastDate
      title
    }
  }
`;
export const ADD_MESSAGE = gql`
  mutation Mutation($conversationID: ID, $isAI: Boolean, $text: String) {
    addMessage(conversationID: $conversationID, isAI: $isAI, text: $text) {
      id
      conversationID
      date
      isAI
      text
    }
  }
`;

export const EDIT_CONVERSATION = gql`
  mutation Mutation($conversationID: ID) {
    editConversation(conversationID: $conversationID) {
      id
      lastDate
    }
  }
`;

export const DELETE_CONVERSATION = gql`
  mutation Mutation($conversationID: ID) {
    deleteConversation(conversationID: $conversationID)
  }
`;

export const DELETE_MESSAGES = gql`
  mutation Mutation($conversationID: ID) {
    deleteMessages(conversationID: $conversationID)
  }
`;
