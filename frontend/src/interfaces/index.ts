export interface AuthResponse {
  ok: true;
  user: User;
  token: string;
}

export interface GetMessagesResponse {
  ok: true;
  last30: Message[];
}

export interface AuthResponseError {
  ok: false;
  msg: string;
}

export interface User {
  name: string;
  email: string;
  onLine: boolean;
  uid: string;
}

export interface Message {
  from: string;
  to: string;
  message: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
