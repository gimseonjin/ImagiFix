export interface ICreateUser {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
}

export interface IGetUser {
  userId: string;
}

export interface IUpdateUser {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
}
