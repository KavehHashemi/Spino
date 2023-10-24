import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { setCurrentConversation } from "../../store/conversation";
import BackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import "../../style/style.scss";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const { currentConversationName } = useAppSelector(
    (state) => state.conversation
  );
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    dispatch(setCurrentConversation({ id: null, name: null }));
  };

  return (
    <div className="navigation">
      <BackIcon onClick={handleClick} style={{ cursor: "pointer" }}></BackIcon>
      <Typography textTransform="capitalize">
        {currentConversationName}
      </Typography>
    </div>
  );
};

export default Navigation;
