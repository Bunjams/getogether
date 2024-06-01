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

export type EventResult = {
  uuid: string;
  primary_host: null;
  name: string;
  venue: Venu;
  start_date: string;
  end_date: string;
  type: string;
  multi_event: boolean;
  guests_info: {
    invited_count: number;
    accepted_count: number;
  };
  subevents?: {
    uuid: string;
    name: string;
    venue: Venu;
    start_date: string;
    end_date: string;
  }[];
};

export type EventCoHost = {
  event: EventResult;
  team: {
    is_primary_host: true;
    member: User;
  }[];
  invited_team_members: { name: string; email: string }[];
};

export type GuestInitedEvent = {
  guest_subevents?: {
    uuid: string;
    name: string;
    venue: Venu;
    start_date: string;
    end_date: string;
  }[];
} & EventResult;
