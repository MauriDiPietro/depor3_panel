export type UserType = {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  image: string;
  type: string;
  active: boolean;
};

export type UserLogin = {
  email: string;
  password: string;
}
