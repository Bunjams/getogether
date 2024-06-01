import SecondarySideBar, { NavMenu } from "components/SideBar/SecondarySideBar";
import { Home, MessageSquareMore } from "lucide-react";
import { useParams } from "react-router-dom";

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
      <NavMenu
        to={`/guest/${eventId}/chat`}
        icon={
          <MessageSquareMore size={16} strokeWidth={2} color="currentColor" />
        }
      >
        Chat
      </NavMenu>
    </SecondarySideBar>
  );
};

export default GuestNavigation;
