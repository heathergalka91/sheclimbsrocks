import { User } from "./user";

export interface Profile {
  firstName: string;
  email: string;
  image?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  following: boolean;
  photos?: Photo[];
}

export class Profile implements Profile {
  constructor(user: User) {
    this.firstName = user.firstName;
    this.image = user.image;
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

export interface ProfileFormValues
{
  bio: string;
  displayName: string;
}