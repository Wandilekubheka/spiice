import { useEffect, useState } from "react";
import { Conversation, Message } from "../@types/messages";
import {
  createConversation,
  getConversationsList,
  getMessages,
} from "../services/firestoreService";
import { UserModel } from "@/@types/userModel";
import { getUserFromDatabase } from "@/features/auth/service/auth_service";

const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<
    { docID: string; value: Conversation }[]
  >([]);
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

  const fetchConversations = async (userId: string) => {
    setLoading(true);
    try {
      const data = await getConversationsList(userId);
      if (data && data.length > 0) {
        setConversations(
          data.map((item) => ({ docID: item.docId, value: item.value }))
        );
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
    createChat,
  };
};

export default useMessages;
