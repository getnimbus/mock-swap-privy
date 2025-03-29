import { create } from "zustand";

interface Message {
  text: string;
  isUser: boolean;
  showCard?: string;
  isLoading?: boolean;
  isNewMessage?: boolean;
  data?: any;
  metadata?: any;
  createdAt?: string;
}

interface ConversationStore {
  isStartNewConversation: boolean;
  setIsStartNewConversation: (status: boolean) => void;

  conversationId: string;
  setConversationId: (id: string) => void;

  messages: Message[];
  setMessages: (messages: Message[]) => void;
  reset: () => void;
}

export const useConversationStore = create<ConversationStore>((set) => ({
  isStartNewConversation: true,
  setIsStartNewConversation: (status: boolean) =>
    set({ isStartNewConversation: status }),

  conversationId: "",
  setConversationId: (id: string) =>
    set((state) => ({
      conversationId: id,
      isStartNewConversation: !id,
    })),

  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
  reset: () =>
    set({
      conversationId: "",
      isStartNewConversation: true,
      messages: [],
    }),
}));
