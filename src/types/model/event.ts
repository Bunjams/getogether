import { User } from "./user";

type Venu = {
  name: string;
  street_address: string;
  city: string;
  zipcode: string;
  country: string;
};

export type CreateEventResult = {
  uuid: string;
  primary_host: null;
  name: string;
  venue: Venu;
  start_date: null;
  end_date: null;
  type: string;
};

export type SubEvent = {
  uuid: string;
  name: string;
  venue: Venu;
  start_date: string;
  end_date: string;
};

export type EventResult = {
  uuid: string;
  primary_host: null;
  name: string;
  venue: Venu;
  start_date: string;
  end_date: string;
  type: string;
  guests_info: {
    invited_count: number;
    accepted_count: number;
  };
  multi_event: boolean;
  subevents?: SubEvent[];
};

export type EventCoHost = {
  event: EventResult;
  team: {
    is_primary_host: true;
    member: User;
  }[];
  invited_team_members: { name: string; email: string }[];
};

export type GuestInvitedEvent = {
  guest_subevents?: SubEvent[];
} & EventResult;

export type GuestInviteMagicLinkResponse = {
  email: string;
  message: string;
  event: EventResult;
  event_id: string;
  uuid: string;
  status: "ACCEPTED" | "INITIATED" | "REJECTED" | "MAYBE";
};
