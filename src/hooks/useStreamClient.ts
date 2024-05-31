import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useCurrentUser } from "./useCurrentUser";

export const useStreamClient = () => {
  const user = useCurrentUser();
  const [client, setClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    const initializeChat = async () => {
      const userId = process.env.REACT_APP_STREAM_USER_ID || "";
      const apiKey = process.env.REACT_APP_STREAM_API_KEY || "";

      // Call the server-side endpoint to get the token
      const response = await fetch("http://localhost:3001/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: { token: string } = await response.json();
      const token = data.token;

      // Initialize the Stream Chat client
      const client = StreamChat.getInstance(apiKey);
      await client.connectUser(
        {
          id: userId,
          name: user?.first_name,
        },
        token
      );

      setClient(client);
    };

    initializeChat();

    // Clean up the connection when the component unmounts
    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, []);

  return {
    client,
  };
};
