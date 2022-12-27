export interface User{
  firstName: string;
  token: string;
  image?: string;
}

export interface UserFormvalues {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}