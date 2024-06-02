import { useEffect } from "react";
import { setUnreadMessages } from "store/slices/chatUnreadCount";
import { RootState } from "store/store";
import { useChatContext } from "stream-chat-react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import notify from "utils/notify.mp3";
import { debounce } from "utils/debouncing";

export const useMessageCount = () => {
  const { client } = useChatContext();
  const dispatch = useAppDispatch();
  const unreadMessageCount = useAppSelector(
    (state: RootState) => state.chatUnreadCount.unreadMessages
  );

  useEffect(() => {
    if (client) {
      const listener = client.on((e) => {
        const audio = new Audio(notify);
        if (e.total_unread_count !== undefined) {
          dispatch(setUnreadMessages(e.total_unread_count));
          if (e.total_unread_count > 0) {
            audio.play().catch((error) => {});
          }
        }
      });

      return () => listener.unsubscribe();
    }
  }, [client]);

  if (!client) {
    return null;
  }

  if (!client.user) {
    return null;
  }

  return {
    messages: unreadMessageCount,
  };
};
