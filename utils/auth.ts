import { useUserStore } from "@/store/user-store";
import { useConversationStore } from "@/store/conversation-store";
import { useAskAIStore } from "@/store/ask-ai-store";

export const onLogout = () => {
  const setPositionId = useAskAIStore.getState().setPositionId;
  const setAskMsg = useAskAIStore.getState().setAskMsg;
  const setUserData = useUserStore.getState().setUserData;
  const resetConversation = useConversationStore.getState().reset;

  // Clear local storage and state
  localStorage.removeItem("token");
  setUserData(null);
  setPositionId(null);
  setAskMsg(null);
  resetConversation();
};
