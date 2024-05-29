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

export type AllEventResult = {
  uuid: string;
  primary_host: null;
  name: string;
  venue: Venu;
  start_date: string;
  end_date: string;
  type: string;
  subevents?: {
    uuid: string;
    name: string;
    venue: Venu;
    start_date: string;
    end_date: string;
  }[];
};
