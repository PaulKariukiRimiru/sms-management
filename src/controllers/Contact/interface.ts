export interface ContactCreateDetails {
  name: string;
  phonenumber: string;
}

export interface ContactUpdateDetails {
  name?: string;
  phonenumber?: string;
}
