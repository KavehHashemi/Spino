import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { config } from "dotenv";
config();

export const verifyToken = async (bearerToken: string) => {
  const client = jwksClient({
    jwksUri: `https://${process.env.ISSUER}.well-known/jwks.json`,
  });

  const decodedToken = jwt.decode(bearerToken, { complete: true });

  const kid = decodedToken.header.kid;
  const key = await client.getSigningKey(kid);
  const signingKey = key.getPublicKey();

  return new Promise((resolve, reject) => {
    jwt.verify(
      bearerToken,
      signingKey,
      {
        audience: "http://localhost:4000/",
        issuer: `https://${process.env.ISSUER}`,
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      }
    );
  });
};
