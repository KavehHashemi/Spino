import { handleChatDate } from "../../utils";
import { useNavigate } from "react-router-dom";
import { setCurrentConversation } from "../../store/conversation";
import { useAppDispatch } from "../../store/hooks";
import { Card, Typography } from "@mui/material";
import "../../style/style.scss";

import DeleteConversationDialog from "./DeleteConversationDialog";

type conversationProps = {
  id: string;
  title: string;
  startDate: string;
  lastDate: string;
};

const ConversationCard = ({
  id,
  lastDate,
  startDate,
  title,
}: conversationProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(setCurrentConversation({ id: id, name: title }));
    navigate(`/conversations/${id}`);
  };

  return (
    <Card>
      <div className="conversation-card">
        <div id="title" onClick={handleClick}>
          <Typography color="primary">{title}</Typography>
          {/* <Typography variant="caption" color="GrayText">
            {handleDate(startDate)}
          </Typography> */}
          <Typography variant="caption" color="GrayText">
            {handleChatDate(lastDate)}
          </Typography>
        </div>
        <div id="action">
          <DeleteConversationDialog id={id}></DeleteConversationDialog>
        </div>
      </div>
    </Card>
  );
};

export default ConversationCard;
