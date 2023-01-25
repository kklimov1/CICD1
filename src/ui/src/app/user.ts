
import { Post } from './Services/posts.service';

export interface User {
  userId: number;
  bio?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  username: string;
  posts?: Post[];
}