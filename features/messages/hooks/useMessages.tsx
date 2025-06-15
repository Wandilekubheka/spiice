import { useState } from "react";
import { Conversation, Message } from "../@types/messages";
import {
  createConversation,
  getConversationsList,
  getMessages,
  sendMessage as sendMessageToFirestore,
} from "../services/firestoreService";
import { getUserFromDatabase } from "@/features/auth/service/auth_service";

const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedConversationID, setSelectedConversationID] = useState<
    string | null
  >(null);
  const [conversations, setConversations] = useState<
    { docID: string; value: Conversation }[]
  >([]);
  const fetchMessages = async (conversationId: string) => {
    if (!conversationId) {
      setError("Conversation ID is required");
      return;
    }
    setLoading(true);
    try {
      console.log("Fetching messages for conversation:", conversationId);

      const { unsubscribe } = await getMessages(conversationId, setMessages);

      // Unsubscribe from the listener when the component unmounts
      return () => unsubscribe();
    } catch (err) {
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };
  const getConversationsID = async (participants: string[]) => {};

  const createChat = async (participantsUID: string[], message: string) => {
    console.log("Creating chat with participants:", participantsUID);
    console.log("Initial message:", message);

    message = message.trim();
    setLoading(true);
    if (participantsUID.length !== 2) {
      setError("Participants must be exactly two users");
      return;
    }
    if (!message || message.trim() === "") {
      setError("Message cannot be empty");
      return;
    }
    if (participantsUID[0] === participantsUID[1]) {
      setError("Participants must be different users");
      return;
    }
    try {
      const creator = await getUserFromDatabase(participantsUID[0]);
      const receiver = await getUserFromDatabase(participantsUID[1]);
      if (!creator || !receiver) {
        setError("One or both users not found");
        return;
      }
      await createConversation([creator, receiver], message);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (
    conversationId: string,
    senderId: string,
    content: string
  ) => {
    if (!conversationId || !senderId || !content) {
      return;
    }
    setLoading(true);
    try {
      const messageData: Message = {
        conversationId,
        senderId,
        content,
        timestamp: new Date(),
        isRead: false,
      };
      await sendMessageToFirestore(messageData, conversationId);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConversations = async (userId: string) => {
    setLoading(true);
    try {
      const { unsubscribe } = await getConversationsList(
        userId,
        setConversations
      );
      return () => unsubscribe();
    } catch (err: any) {
      setError("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    error,
    fetchMessages,
    fetchConversations,
    conversations,
    createChat,
    sendMessage,
  };
};

export default useMessages;
