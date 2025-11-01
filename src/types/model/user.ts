export type User = {
  first_name: string;
  last_name: string;
  mobile: null | string;
  email: string;
  profile_url: string | null;
  uuid: string;
  role: "HOST" | "VENDOR" | "GUEST" | null;
  refresh: string[];
  access: string;
  member: {
    uuid: string;
    access_token: string;
    member_id: string;
  };
};
