export interface IUser {
  email: string;
  fname: string;
  isAdmin: boolean;
  lname: string;
  __v: number;
  _id: string;
}
export interface SessionResponse {
  user: IUser;
  message?: string;
}