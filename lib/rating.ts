import { User } from './user';

export interface Rating {
  id?: string;
  user: User;
  number: number;
  comment: string;
  date: string;
}
