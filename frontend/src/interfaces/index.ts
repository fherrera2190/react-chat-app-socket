export interface AuthResponse {
  ok: true;
  user: User;
  token: string;
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
