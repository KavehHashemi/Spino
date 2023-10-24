import { useMutation } from "@apollo/client/react";
import Button from "@mui/material/Button";
import {
  CONVERSATIONS_QUERY,
  DELETE_CONVERSATION,
  DELETE_MESSAGES,
} from "../../graphql";
import Dialog from "@mui/material/Dialog";
import Title from "@mui/material/DialogTitle";
import Actions from "@mui/material/DialogActions";
import Content from "@mui/material/DialogContent";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { useAuth0 } from "@auth0/auth0-react";

type ConversationProps = {
  id: string;
};

const DeleteConversationDialog = ({ id }: ConversationProps) => {
  const { user } = useAuth0();
  const [open, setOpen] = useState(false);
  const [deleteConversationMessages] = useMutation(DELETE_MESSAGES);
  const [deleteConversationMutation] = useMutation(DELETE_CONVERSATION, {
    refetchQueries: [
      {
        query: CONVERSATIONS_QUERY,
        variables: { userID: user?.sub?.split("|")[1] },
      },
    ],
    onCompleted: () => {
      setOpen(false);
      deleteConversationMessages({ variables: { conversationID: id } });
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleDelete = async () => {
    await deleteConversationMutation({ variables: { conversationID: id } });
  };

  return (
    <>
      <IconButton onClick={(e) => handleClick(e)}>
        <DeleteIcon color="action" fontSize="small"></DeleteIcon>
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Title>Delete Conversation</Title>
        <Content>Are you sure you want to delete this conversation?</Content>
        <Actions>
          <Button onClick={handleDelete}>Delete</Button>
        </Actions>
      </Dialog>
    </>
  );
};

export default DeleteConversationDialog;
