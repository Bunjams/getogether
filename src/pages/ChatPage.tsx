import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Loader from "components/Design/Loader/Loader";
import { useStreamClient } from "hooks/useStreamClient";
import React from "react";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const ChatPage = () => {
  const { client } = useStreamClient();

  const memoClient = React.useMemo(() => client, [client]);

  if (!memoClient) return <Loader />;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatedPage
      variants={sectionVariants}
      className="grid grid-flow-col w-full gap-2 pt-8 pl-10 overflow-auto"
    >
      <Chat client={memoClient}>
        <ChannelList />
        <section className="grid grid-flow-col w-full gap-2 overflow-auto h-[calc(100vh-64px)]">
          <Channel>
            <Window>
              <span className="sticky top-0 z-50">
                <ChannelHeader />
              </span>
              <MessageList />
              <span className="sticky bottom-0 z-50">
                <MessageInput />
              </span>
            </Window>
            <Thread />
          </Channel>
        </section>
      </Chat>
    </AnimatedPage>
  );
};

export default ChatPage;
