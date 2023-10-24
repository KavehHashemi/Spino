import { ReactElement, ReactNode, useEffect, useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import { setContext } from "@apollo/client/link/context";

export default function ApolloWrapper({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [bearerToken, setBearerToken] = useState<string>("");

  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : "";
      setBearerToken(token);
    };
    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  const authLink = setContext((_, { headers, ...rest }) => {
    if (!bearerToken) return { headers, ...rest };
    const newContext = {
      ...rest,
      headers: {
        ...headers,
        authorization: bearerToken,
      },
    };
    return newContext;
  });

  console.log(`authentication: ${bearerToken.length}`);

  const httpLink = new HttpLink({
    uri: "http://localhost:4000",
  });
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
