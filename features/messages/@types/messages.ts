import { UserModel } from "@/@types/userModel";
import { Timestamp } from "firebase/firestore";

export interface Conversation {
  participants: UserModel[]; // Array of user
  participantsUid: string[]; // Array of user IDs of the participants
  lastMessage: string;
  lastSender: "me" | "other"; // Indicates if the last message was sent by the current user or the other participant
}

export interface Message {
  conversationId: string; // ID of the conversation this message belongs to
  senderId: string; // ID of the user who sent the message
  content: string; // The actual message content
  timestamp: Date | Timestamp | string; // When the message was sent
  isRead: boolean; // Indicates if the message has been read
}
