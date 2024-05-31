export type Guest = {
  email: string;
  message: string;
  name: string;
  event: {
    uuid: string;
    primary_host: string;
    name: string;
    venue: string | null;
    start_date: string;
    end_date: string;
    type: string;
  };
  event_id: string;
  uuid: string;
  status: "ACCEPTED" | "INITIATED" | "REJECTED" | "MAYBE";
};

export type InviteGuestResponse = {
  rsvp_sent_success_list: Guest[];
  rsvp_sent_failed_list: {
    email: string;
    error: string;
  }[];
};
