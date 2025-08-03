export interface User {
    name: string;
    email: string;
}

export interface UserResponse {
  data: User;
  message?: string;
}
