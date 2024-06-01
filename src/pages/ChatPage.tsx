import AnimatedPage from "components/Design/AnimatedPage/AnimatedPage";
import Async from "components/Design/Async/Async";
import Header from "components/Design/Header/Header";
import { PageLoader } from "components/Design/Loader/Loader";
import PageLayout from "components/Design/PageLayout/PageLayout";
import { useStreamClient } from "hooks/useStreamClient";
import React from "react";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useMessageContext,
  MessageSimple,
  Message,
  useChatContext,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

const ChannelFilteredList = () => {
  const { client } = useChatContext();

  return (
    <ChannelList
      filters={{
        type: "messaging",
        members: { $in: [client.userID!] },
      }}
    />
  );
};

// const MM = <
//   StreamChatGenerics extends
//     DefaultStreamChatGenerics = DefaultStreamChatGenerics,
// >() => {
//   const { message } = useMessageContext();

//   if (message.text === "hey") {
//     return (
//       <div className="text-body-bold bg-red-200 rounded p-2 text-red-600">
//         {message.text}
//         <Loader />
//       </div>
//     );
//   }

//   return <MessageSimple />;
// };

const ChatPage = () => {
  const { client } = useStreamClient();

  const memoClient = React.useMemo(() => client, [client]);

  if (!memoClient) return <PageLoader noBorder block />;

  return (
    <AnimatedPage animation="fade" className="flex w-full flex-col gap-2">
      <Async.Root
        isEmpty={false}
        isLoading={!memoClient}
        isSuccess={Boolean(memoClient)}
      >
        <Async.Empty>
          <></>
        </Async.Empty>
        <Async.Success>
          <PageLayout header={<Header title="Chat" />}>
            <section className="grid grid-flow-col w-full gap-2 overflow-auto h-[calc(100vh-140px)]">
              <Chat client={memoClient}>
                <ChannelFilteredList />
                <section className="grid grid-flow-col w-full gap-2 overflow-auto ">
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
            </section>
          </PageLayout>
        </Async.Success>
      </Async.Root>
    </AnimatedPage>
  );
};

export default ChatPage;
