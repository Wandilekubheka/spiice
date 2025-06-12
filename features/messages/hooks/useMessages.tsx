import { useEffect, useState } from "react";
import { Conversation, Message } from "../@types/messages";

type Props = {};

const useMessages = (props: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  return {};
};

export default useMessages;
