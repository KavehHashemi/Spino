/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useAppSelector } from "../../store/hooks";
import NewMessage from "../messages/NewMessage";
import { ADD_MESSAGE, MESSAGES_QUERY, QUESTION_QUERY } from "../../graphql";
import { MessageType } from "../../types";
import SingleMessage from "../messages/SingleMessage";
import "../../style/style.scss";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

const Conversation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentConversation } = useAppSelector((state) => state.conversation);
  const { data, loading, error } = useQuery(MESSAGES_QUERY, {
    variables: { conversationID: currentConversation },
  });

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    if (data && data.messages.length === 1) {
      setIsLoading(true);
      getAnswerForFirstMessage(data.messages[0]);
    }
  }, [data]);

  const [questionQuery] = useLazyQuery(QUESTION_QUERY);
  const [addMessageMutation] = useMutation(ADD_MESSAGE, {
    refetchQueries: [
      {
        query: MESSAGES_QUERY,
        variables: { conversationID: currentConversation },
      },
    ],
  });
  const addAIAnswer = async (answer: string) => {
    await addMessageMutation({
      variables: {
        conversationID: currentConversation,
        text: answer,
        isAI: true,
      },
    });
  };

  const getAnswerForFirstMessage = async (message: MessageType) => {
    await questionQuery({
      variables: {
        question: message.text,
        conversationID: currentConversation,
      },
      onCompleted: async (data) => {
        await addAIAnswer(data.question.text);
        setIsLoading(false);
      },
    });
  };

  if (error) return <div className="error">{error.message}</div>;
  if (loading)
    return (
      <div className="loading">
        <CircularProgress></CircularProgress>
      </div>
    );
  else
    return (
      <>
        <div className="conversation-container">
          <div className="messages-container">
            {data?.messages?.map((msg: MessageType) => {
              return (
                <SingleMessage
                  key={msg.id}
                  date={msg.date}
                  isAI={msg.isAI}
                  text={msg.text}
                ></SingleMessage>
              );
            })}
            {isLoading ? (
              <div className="single-message-container-a">
                <Card className="single-message">
                  <Skeleton
                    variant="rounded"
                    width={250}
                    height={80}
                  ></Skeleton>
                </Card>
              </div>
            ) : null}
          </div>
        </div>
        <NewMessage
          conversationID={currentConversation}
          setIsLoading={setIsLoading}
        ></NewMessage>
      </>
    );
};

export default Conversation;
