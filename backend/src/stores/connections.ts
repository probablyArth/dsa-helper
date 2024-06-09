import { ConnectionDetails } from 'types/conversation';

const store = new Map<string, ConnectionDetails>();

export const addConnection = (id: string, details: ConnectionDetails) => {
  if (!store.has(id)) {
    store.set(id, details);
  }
};

export const deleteConnection = (id: string) => {
  if (store.has(id)) store.delete(id);
};

export const addConversation = (id: string, message: ConnectionDetails['conversation'][0]) => {
  const conn = store.get(id);
  if (conn !== undefined) {
    conn.conversation.push(message);
  }
};

export const getConnection = (id: string) => store.get(id);
