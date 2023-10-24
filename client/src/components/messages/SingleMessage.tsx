import { Card, CardContent, Typography } from "@mui/material";
import { handleChatDate } from "../../utils";
import "../../style/style.scss";

type SingleMessageProps = {
  date: string;
  isAI: boolean;
  text: string;
};

const SingleMessage = ({ date, isAI, text }: SingleMessageProps) => {
  return (
    <div
      className={
        isAI ? "single-message-container-a" : "single-message-container-h"
      }
    >
      <Card className="single-message">
        <CardContent>
          <Typography color={isAI ? "secondary" : "primarydark"}>
            {text}
          </Typography>
          <Typography variant="caption" color="GrayText">
            {handleChatDate(date)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleMessage;
