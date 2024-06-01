export type VendorService = { name: string; uuid: string; category: string };

export type AvailableVendors = {
  name: string;
  uuid: string;
  email: string;
  services: VendorService[];
};

export type InvitedVendor = {
  name: string;
  email: string;
  status: "JOINED" | "INVITED";
  event_status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  invited_by: {
    name: string;
    uuid: string;
  };
  uuid: string;
  services: VendorService[];
  rating: number;
  channel_utl: string | null;
};
