import { useEffect, useMemo, useState } from "react";
import { StreamChat } from "stream-chat";
import { useCurrentUser } from "./useCurrentUser";
import { useRandomProfile } from "./useRandomProfile";

export const useStreamClient = () => {
  const user = useCurrentUser();
  const [client, setClient] = useState<StreamChat | null>(null);
  const profileUrl = useRandomProfile();

  const token = user?.member?.access_token;
  const userId = user?.member?.member_id;

  const streamUser = useMemo(
    () => ({
      id: userId,
      name: user?.first_name,
      image: user?.profile_url || profileUrl,
    }),
    [userId]
  );

  useEffect(() => {
    const initializeChat = async () => {
      const apiKey = process.env.REACT_APP_STREAM_API_KEY || "";

      // Initialize the Stream Chat client
      const client = StreamChat.getInstance(apiKey);
      await client.connectUser(
        {
          ...streamUser,
        },
        token
      );

      setClient(client);
    };

    if (userId && token) {
      initializeChat();
    }

    // Clean up the connection when the component unmounts
    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [streamUser]);

  return {
    client,
  };
};
