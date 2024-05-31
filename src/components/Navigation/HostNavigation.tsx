import SecondarySideBar, { NavMenu } from "components/SideBar/SecondarySideBar";
import {
  HandCoins,
  Home,
  ListChecks,
  MessageSquareMore,
  Users,
} from "lucide-react";
import { useParams } from "react-router-dom";

const HostNavigation = () => {
  const { eventId } = useParams<{ eventId: string }>();

  return (
    <SecondarySideBar baseRoute={`/host/${eventId}/home`}>
      <NavMenu
        to={`/host/${eventId}/home`}
        icon={<Home size={16} strokeWidth={2} color="currentColor" />}
      >
        Home
      </NavMenu>
      <NavMenu
        to={`/host/${eventId}/chat`}
        icon={
          <MessageSquareMore size={16} strokeWidth={2} color="currentColor" />
        }
      >
        Chat
      </NavMenu>
      <NavMenu
        to={`/host/${eventId}/guest-list`}
        icon={<ListChecks size={16} strokeWidth={2} color="currentColor" />}
      >
        Guest List
      </NavMenu>
      <NavMenu
        to={`/host/${eventId}/vendors`}
        icon={<Users size={16} strokeWidth={2} color="currentColor" />}
      >
        Vendors
      </NavMenu>
      <NavMenu
        to={`/host/${eventId}/expense-manager`}
        icon={<HandCoins size={16} strokeWidth={2} color="currentColor" />}
      >
        Expense Manager
      </NavMenu>
    </SecondarySideBar>
  );
};

export default HostNavigation;
