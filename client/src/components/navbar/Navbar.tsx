import Account from "./Account";
import ModeSwitch from "./ModeSwitch";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "../../style/style.scss";
import { Typography } from "@mui/material";
import Navigation from "./Navigation";

type props = {
  isLightMode: boolean;
  conversationName: string | null;
};

const Navbar = ({ isLightMode, conversationName }: props) => {
  return (
    <AppBar position="sticky">
      <Toolbar className="navbar">
        {conversationName !== null ? (
          <Navigation></Navigation>
        ) : (
          <Typography variant="h6" fontWeight="bold" color="whitesmoke">
            Home
          </Typography>
        )}
        <Toolbar sx={{ gap: "1rem" }}>
          <Account></Account>
          <ModeSwitch isLightMode={isLightMode}></ModeSwitch>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
