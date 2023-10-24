import { useMutation, useLazyQuery } from "@apollo/client";
import {
  ADD_MESSAGE,
  EDIT_CONVERSATION,
  MESSAGES_QUERY,
  QUESTION_QUERY,
} from "../../graphql";
import { useRef } from "react";
import { Button, Paper, TextField } from "@mui/material";

type NewMessageProps = {
  conversationID: string | null;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewMessage = ({ conversationID, setIsLoading }: NewMessageProps) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const [questionQuery] = useLazyQuery(QUESTION_QUERY);
  const [conversationMutation] = useMutation(EDIT_CONVERSATION);
  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    refetchQueries: [
      {
        query: MESSAGES_QUERY,
        variables: { conversationID: conversationID },
      },
    ],
  });

  const addNewMessage = async () => {
    await addMessageMutation({
      variables: {
        conversationID: conversationID,
        text: messageRef.current?.value,
        isAI: false,
      },
    });
    setIsLoading(true);
  };

  const addAIAnswer = async (answer: string) => {
    await addMessageMutation({
      variables: {
        conversationID: conversationID,
        text: answer,
        isAI: true,
      },
    });
    setIsLoading(false);
  };

  const updateConversation = async () => {
    await conversationMutation({
      variables: { conversationID: conversationID },
    });
  };

  const handleClick = async () => {
    if (messageRef.current?.value) {
      await addNewMessage();
      await questionQuery({
        variables: {
          question: messageRef.current?.value,
          conversationID: conversationID,
        },
        onCompleted: async (data) => {
          if (messageRef.current) messageRef.current.value = "";
          await addAIAnswer(data.question.text);
        },
      });
    }
    updateConversation();
  };

  return (
    <>
      <Paper square className="new-message-container">
        <div id="message">
          <TextField
            name="new-message"
            placeholder="ask me"
            variant="outlined"
            autoFocus
            inputRef={messageRef}
            type="text"
          ></TextField>
          <Button variant="contained" onClick={handleClick}>
            Ask
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default NewMessage;
