import SecondarySideBar, { NavMenu } from "components/SideBar/SecondarySideBar";
import {
  CalendarClock,
  CreditCard,
  HandCoins,
  Home,
  ListChecks,
  MessageSquareMore,
  Sparkles,
  Users,
  WandSparkles,
} from "lucide-react";
import React from "react";

const VendorNavigation = () => {
  return (
    <SecondarySideBar baseRoute="/vendor">
      <NavMenu
        to={`/vendor/home`}
        icon={<Home size={16} strokeWidth={2} color="currentColor" />}
      >
        Home
      </NavMenu>

      <NavMenu
        to={`/vendor/event`}
        icon={<Sparkles size={16} strokeWidth={2} color="currentColor" />}
      >
        Event
      </NavMenu>
      <NavMenu
        to={`/vendor/chat`}
        icon={
          <MessageSquareMore size={16} strokeWidth={2} color="currentColor" />
        }
      >
        Chat
      </NavMenu>
      <NavMenu
        to={`/vendor/services`}
        icon={<WandSparkles size={16} strokeWidth={2} color="currentColor" />}
      >
        Services
      </NavMenu>
      <NavMenu
        to={`/vendor/payments`}
        icon={<CreditCard size={16} strokeWidth={2} color="currentColor" />}
      >
        Payments
      </NavMenu>
      <NavMenu
        to={`/vendor/calendar`}
        icon={<CalendarClock size={16} strokeWidth={2} color="currentColor" />}
      >
        Calendar
      </NavMenu>
    </SecondarySideBar>
  );
};

export default VendorNavigation;
