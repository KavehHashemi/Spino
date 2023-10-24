import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

const Auth0Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "http://localhost:4000/",
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0Wrapper;
