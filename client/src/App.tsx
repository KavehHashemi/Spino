/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import { useAuth0 } from "@auth0/auth0-react";

import "./style/style.scss";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightThemeOptions, darkThemeOptions } from "./Themes";
import Paper from "@mui/material/Paper";
import Navbar from "./components/navbar/Navbar";
import CircularProgress from "@mui/material/CircularProgress";

import ConversationsList from "./components/conversations/ConversationsList";
import Conversation from "./components/conversations/Conversation";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { currentConversation, currentConversationName } = useAppSelector(
    (state) => state.conversation
  );
  const { isLightMode } = useAppSelector((state) => state.mode);
  const darkTheme = createTheme(darkThemeOptions);
  const lightTheme = createTheme(lightThemeOptions);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentConversation && !isLoading && isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <Paper sx={{ minHeight: "100dvh", borderRadius: "0" }}>
        <Navbar
          isLightMode={isLightMode}
          conversationName={currentConversationName}
        ></Navbar>
        {isLoading ? (
          <div className="loading">
            <CircularProgress></CircularProgress>
          </div>
        ) : isAuthenticated ? (
          <Routes>
            <Route
              path="/"
              element={<ConversationsList></ConversationsList>}
            ></Route>
            <Route
              path={`/conversations/${currentConversation}`}
              element={<Conversation></Conversation>}
            ></Route>
          </Routes>
        ) : (
          <div className="login">you need to login first</div>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default App;
