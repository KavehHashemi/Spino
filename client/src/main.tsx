import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/store.ts";
import ApolloWrapper from "./config/ApolloWrapper.tsx";
import Auth0Wrapper from "./config/Auth0Wrapper.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Auth0Wrapper>
      <ApolloWrapper>
        <Provider store={store}>
          <App></App>
        </Provider>
      </ApolloWrapper>
    </Auth0Wrapper>
  </BrowserRouter>
);
