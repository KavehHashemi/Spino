import "../../style/style.scss";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { CardContent, Paper, Typography } from "@mui/material";

const Account = () => {
  const { user, logout, loginWithRedirect } = useAuth0();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  if (user)
    return (
      <>
        <Button color="inherit" onClick={handleClick}>
          {user.nickname}
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <div style={{ padding: "0.5rem 0" }}>
            <Button
              sx={{ padding: "0.5rem 1.5rem", borderRadius: "0" }}
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        </Popover>
      </>
    );
  else {
    return (
      <Button color="inherit" onClick={() => loginWithRedirect()}>
        LOGIN
      </Button>
    );
  }
};

export default Account;
