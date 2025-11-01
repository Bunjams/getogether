import { useEffect, useMemo, useState } from "react";
import { useGetUserProfileQuery } from "store/api/userProfile";
import { StreamChat } from "stream-chat";
import { useRandomProfile } from "./useRandomProfile";

export const useStreamClient = () => {
  const { data } = useGetUserProfileQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const profileUrl = useRandomProfile();

  const chatAccessToken = data?.member?.access_token;
  const chatMemberId = data?.member?.member_id;

  const user = useMemo(
    () => ({
      id: chatMemberId || "",
      name: data?.first_name || "",
      image: data?.profile_url || profileUrl,
    }),
    [chatMemberId]
  );

  const [client, setClient] = useState<null | StreamChat>(null);
  const apiKey = process.env.REACT_APP_STREAM_API_KEY || "";

  useEffect(() => {
    if (chatAccessToken && apiKey) {
      const client = new StreamChat(apiKey, { timeout: 20000 });
      // prevents application from setting stale client (user changed, for example)
      let didUserConnectInterrupt = false;

      const connectionPromise = client.connectUser(user, chatAccessToken).then(
        (e) => {
          // @ts-ignore
          if (!didUserConnectInterrupt) {
            setClient(client);
          }
        },
        (e) => console.log(e)
      );

      return () => {
        didUserConnectInterrupt = true;
        setClient(null);
        // wait for connection to finish before initiating closing sequence
        connectionPromise
          .then(() => client.disconnectUser())
          .then(() => {
            console.log("connection closed");
          });
      };
    }
  }, [chatAccessToken, user]);

  return {
    client,
    user,
  };
};
