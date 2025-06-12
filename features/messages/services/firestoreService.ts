import { db } from "@/firebase";
import { Message } from "../@types/messages";
import {
  addDocToDatabse,
  getdocFromDatabase,
} from "@/service/firestoreServices";
import { collection, getDocs, query, where } from "firebase/firestore";

const sendMessage = async (
  content: string,
  senderId: string,
  conversationId: string
) => {
  try {
    const newMessage: Message = {
      conversationId, // Replace with actual conversation ID
      senderId,
      content,
      timestamp: new Date(), // Use current date and time
      isRead: false, // Default to false when sending a new message
    };
    // Add the message to the "messages" collection
    await addDocToDatabse(newMessage, conversationId);

    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const getMessages = async (conversationId: string) => {
  try {
    const docSnap = await getDocs(
      query(
        collection(db, "messages"),
        where("conversationId", "==", conversationId)
      )
    );
    let messages: Message[] = [];
    if (docSnap.empty) {
      console.log("No messages found for this conversation.");
      return messages; // Return empty array if no messages found
    }
    docSnap.forEach((doc) => {
      const messageData = doc.data() as Message;
      messages.push(messageData);
    });
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to fetch messages");
  }
};

const getConversatioList = async (userId: string) => {
  try {
    const docSnap = await getDocs(
      query(
        collection(db, "conversations"),
        where("participants", "array-contains", userId)
      )
    );
    let conversations: any[] = [];
    if (docSnap.empty) {
      console.log("No conversations found for this user.");
      return conversations; // Return empty array if no conversations found
    }
    docSnap.forEach((doc) => {
      const conversationData = doc.data();
      conversations.push(conversationData);
    });
    return conversations;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw new Error("Failed to fetch conversations");
  }
};

export { sendMessage, getMessages, getConversatioList };
