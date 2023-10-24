import { useMutation } from "@apollo/client";
import {
  ADD_CONVERSATION,
  ADD_MESSAGE,
  CONVERSATIONS_QUERY,
  MESSAGES_QUERY,
} from "../../graphql";
import { useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCurrentConversation } from "../../store/conversation";
import { useNavigate } from "react-router-dom";
import "../../style/style.scss";
import { Button, TextField } from "@mui/material";

type NewConversationProps = {
  userID: string;
};

const NewConversation = ({ userID }: NewConversationProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const { user } = useAuth0();
  const messageRef = useRef<HTMLInputElement>(null);

  const [addConversationMutation] = useMutation(ADD_CONVERSATION, {
    refetchQueries: [
      {
        query: CONVERSATIONS_QUERY,
        variables: { userID: user?.sub?.split("|")[1] },
      },
    ],
    onCompleted: (data) => {
      dispatch(
        setCurrentConversation({
          id: data.addConversation.id,
          name: data.addConversation.title,
        })
      );
      addTitleAsFirstMessage(data.addConversation.id);
    },
  });

  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    refetchQueries: [
      {
        query: MESSAGES_QUERY,
        variables: { conversationID: currentConversation },
      },
    ],
    onCompleted: () => {
      navigate(`/conversations/${currentConversation}`);
    },
  });

  const addTitleAsFirstMessage = (id: string) => {
    addMessageMutation({
      variables: {
        conversationID: id,
        text: messageRef.current?.value,
        isAI: false,
      },
    });
  };

  const addNewConversation = async () => {
    if (messageRef.current?.value)
      await addConversationMutation({
        variables: { userID: userID, title: messageRef.current?.value },
      });
  };

  return (
    <div className="new-converation-container">
      <TextField
        name="new-conversation"
        label="Start a new conversation"
        placeholder="ask me"
        variant="outlined"
        autoFocus
        inputRef={messageRef}
        type="text"
      ></TextField>
      <Button variant="contained" onClick={addNewConversation}>
        Ask
      </Button>
    </div>
  );
};

export default NewConversation;
