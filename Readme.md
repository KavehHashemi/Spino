# About
This is a fullstack Q&A app that answers question based on the text documents provided to it.
It uses LangChain to communicate with OpenAI API to interpret questions and give answers.
## Stack
<div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="60" title="React"/>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png?20221110153201" alt="TypeScript" width="60" title="TypeScript"/>
    <img src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.svg" alt="Redux" height="60" title="Redux"/>
    <div style="background-color:white; display:inline-flex;height:auto">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" alt="OpenAI" height="60" title="OpenAI"/>
    </div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/LangChain_logo.png" alt="LangChain" height="60" title="LangChain"/>
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="NodeJS" height="60" title="NodeJS"/>
    <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" alt="GraphQL" height="60" title="GraphQL"/>
    <img src="https://upload.wikimedia.org/wikipedia/en/5/5a/MongoDB_Fores-Green.svg" alt="MongoDB" height="60" title="MongoDB"/>
    <img src="https://www.vectorlogo.zone/logos/auth0/auth0-icon.svg" alt="Auth0" height="60" title="Auth0"/>
</div>

## Requirements
1. Auth0  
Create a Single Page Application in Auth0.com  > grab application's domain and cleint ID.
2. MongoDB  
Create a MongoDB Atlas project  > grab connection string and admin password.
3. OpenAI  
Create an OpenAI account > grab your API key.  
4. in the server directory create a .env file and set these values: 
```
    ISSUER = {AUTH0-APPLICATION-DOMAIN}  
    OPENAI_API_KEY = {YOUR-OPENAI-API-KEY}  
    MONGOPASSWORD = {YOUR-MONGODB-PASSWORD}  
```
5. in the client directory create a .env file and set these values  
```
    VITE_DOMAIN = {AUTH0-APPLICATION-DOMAIN}  
    VITE_CLIENT_ID = {AUTH0-APPLICATION-CLIENT-ID}  
```  
## Starting Up
```
cd server
npm start
```
then, in a new terminal,
```
cd client
npm run dev
```

## Documents

The app currently reads from two provided sample documents about Spinosaurus (of course). Namely, "about.txt" and "description.txt".
You can replace your own documents and change the coresponding paths in server/src/AI/QA.ts, so that it gives answers according to your documents.