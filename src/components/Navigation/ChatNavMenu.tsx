import Tag from "components/Design/Tag/Tag";
import { NavMenu } from "components/SideBar/SecondarySideBar";
import { useMessageCount } from "hooks/useMessageCount";
import { MessageSquareMore } from "lucide-react";

const ChatNavMenu = ({ to }: { to: string }) => {
  const messageCount = useMessageCount();
  const { messages } = messageCount || { messages: 0 };

  const count = messages > 99 ? "+99" : messages;

  const Count = () => (messages > 0 ? <Tag tagColor="red">{count}</Tag> : null);

  return (
    <NavMenu
      to={to}
      icon={
        <MessageSquareMore size={16} strokeWidth={2} color="currentColor" />
      }
    >
      <div className="flex justify-between w-full">
        Chat <Count />
      </div>
    </NavMenu>
  );
};

export default ChatNavMenu;
