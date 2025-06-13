import { useEffect, useState } from "react";
import { Conversation, Message } from "../@types/messages";
import {
  getConversationsList,
  getMessages,
} from "../services/firestoreService";

const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  useEffect(() => {}, []);
  const fetchMessages = async (conversationId: string) => {
    setLoading(true);
    try {
      await getMessages(conversationId).then((data) => {
        if (data && data.length > 0) {
          setMessages(data);
        }
      });
    } catch (err) {
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const fetchConversations = async (userId: string) => {
    setLoading(true);
    try {
      const data = await getConversationsList(userId);
      if (data && data.length > 0) {
        setConversations(data);
      }
    } catch (err) {
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
  };
};

export default useMessages;
