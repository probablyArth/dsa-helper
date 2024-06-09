# dsa-helper

# Architecture

The template used for creating the server was created by me https://github.com/probablyArth/typescript-nodejs-zod

Tech used: websockets (socket.io), NextJS, TailwindCSS and Express

- user is requried to input the problem link in the homepage
- if the link is valid a websocket connection is estabilished with the express server
- sessions are managed as ws connections and they are closed if the page is refreshed (todo: use cookie based sessions or authentication)
- a set of system instructions are coded to enhance the behvaiour of the llm to our needs.
- a map of ws connection to SessionData is managed in the server memory
- details of problem and the chat history is also stored in the SessionData
- whenever there's a new message, either from the assistant or the user that conversation is updated in the map.
- whenever we make a completion call to the llm the whole context is sent

# Running locally

Instructions for running both the client and the server are mentioned in the respective folders
