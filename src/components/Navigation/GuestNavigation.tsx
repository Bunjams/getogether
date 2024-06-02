import SecondarySideBar, { NavMenu } from "components/SideBar/SecondarySideBar";
import { Home, MessageSquareMore } from "lucide-react";
import { useParams } from "react-router-dom";
import ChatNavMenu from "./ChatNavMenu";

const GuestNavigation = () => {
  const { eventId } = useParams<{ eventId: string }>();

  return (
    <SecondarySideBar baseRoute={`/guest/${eventId}/home`}>
      <NavMenu
        to={`/guest/${eventId}/home`}
        icon={<Home size={16} strokeWidth={2} color="currentColor" />}
      >
        Home
      </NavMenu>
      <ChatNavMenu to={`/guest/${eventId}/chat`} />
    </SecondarySideBar>
  );
};

export default GuestNavigation;
