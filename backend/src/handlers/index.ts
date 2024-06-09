import { fetchLeetCodeProblem } from 'services/leetcode';
import { prompt } from 'services/llm';
import { Socket } from 'socket.io';
import { addConnection, addConversation, deleteConnection, getConnection } from 'stores/connections';
import { ConversationMessage, Role } from 'types/conversation';
import { ProblemInput } from 'types/problem';
import { extractProblemName } from 'utils/problem';

export const handleConnection = async (socket: Socket) => {
  const problem_link: string | undefined = socket.handshake.query['problem'] as unknown as string | undefined;
  if (!problem_link) {
    deleteConnection(socket.id);
    socket.disconnect(true);
    return;
  }
  try {
    const problem_name = extractProblemName(problem_link);
    if (problem_name == null) {
      deleteConnection(socket.id);
      socket.disconnect(true);
      return;
    }
    const res = await fetchLeetCodeProblem(problem_name);
    if (res.content === null) {
      deleteConnection(socket.id);
      socket.disconnect(true);
      return;
    }
    const problemInput: ProblemInput = {
      content: res.content,
      hints: res.hints,
      title: res.title,
      topics: res.topicTags?.map((topic) => topic.name),
    };
    addConnection(socket.id, { problem: problemInput, conversation: [] });
    const chatResponse = await prompt(problemInput, getConnection(socket.id)?.conversation as ConversationMessage[]);
    const message = chatResponse.choices[0].message;
    addConversation(socket.id, { content: message.content as string, role: Role.LLM });
    socket.emit('message', message.content as string);
  } catch (err) {
    console.log({ err });
    deleteConnection(socket.id);
    socket.disconnect(true);
  }
};

export const handleMessage = async (socket: Socket, message: string) => {
  addConversation(socket.id, { content: message, role: Role.USER });
  const conn = getConnection(socket.id);
  if (!conn) return;

  const chatResponse = await prompt(conn.problem, conn.conversation);
  const responseMessage = chatResponse.choices[0].message;
  addConversation(socket.id, { content: responseMessage.content as string, role: Role.LLM });
  socket.emit('message', responseMessage.content as string);
};
