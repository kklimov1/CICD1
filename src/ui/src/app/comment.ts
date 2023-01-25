import { Reply } from "./reply";
import { User } from "./model/user";
import { Post } from "./Services/posts.service";

export class Comment {
  commentId?: number;
  postId: number;
  userId: number;
  username?: string;
  postedDate?: string;
  message: string;
  replies?: Reply[];
  user?: User;
  post?: Post;

  constructor(postId: number, userId: number, message: string, user?: User, post?: Post, commentId?: number, username?: string, postedDate?: string, replies?: Reply[]) {
    this.postId = postId;
    this.userId = userId;
    this.message = message;
    this.commentId = commentId;
    this.username = username;
    this.postedDate = postedDate;
    this.replies = replies;
    this.user = user;
  }
}