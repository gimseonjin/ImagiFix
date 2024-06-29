export interface ICreateUser {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName?: string;
  lastName?: string;
  planId?: number;
  creditBalance?: number;
}
