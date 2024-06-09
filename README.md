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

# Parsing problems
- the problems are fetched from the leetcode's graphql api
- the problem link is verified first and the problem's title slug is used to get the problem from api.

# Use of GPT
Several prompts with `system` and `assistant` role are passed before the actual queries to alter the behaviour of the assitant to our needs.
```js
[
    {
      role: 'system',
      content: 'You are a DSA tutor, your job is to help the user to build intuition for the given dsa problem',
    },
    { role: 'system', content: 'Never give the solution for even a brute force apporach even if the user asks for it' },
    {
      role: 'system',
      content: `Here's the problem title: ${problem.title}\n The problem content: ${problem.content} Topics: ${problem.topics} Hints: ${problem.hints}`,
    },
    { role: 'system', content: 'you will help the user come to the solution by asking user the relevant questions and making them think' },
    {
      role: 'assistant',
      content:
        'I will not give the user the direct solution rather try for the user to build an intution and make the user solve the problem theirself',
    },
    {
      role: 'assistant',
      content:
        'I will not reveal the topics of the problem to the user but rather give very little hints about the data structure and approach if the user is not able to get to it themselves',
    },
  ]
```

# Running locally

Instructions for running both the client and the server are mentioned in the respective folders

# How to use the application

Once you have both the services setup, go to `localhost:3000`

- add a valid leetcode problem link in the input and press the button.
- the client will generate the first response and start by asking you a question to help you approach the question from scratch.
- keep asking questions and you may generate a good intuition of the question and approach.
- refresh the tab or open the same url in a new tab to generate a new session.
