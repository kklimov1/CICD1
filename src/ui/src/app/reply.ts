import { Post } from "./Services/posts.service";
import { User } from "./model/user";
import { Comment } from "./comment";

export class Reply {
    id?: number;
    postId?: number;
    commentId: number;
    userId: number;
    username?: string;
    postedDate?: string;
    message: string;
    user?: User;
    post?: Post;
    comment?: Comment;

    constructor(commentId: number, userId: number, message: string, username?: string, post?: Post, comment?: Comment, user?: User, postId?: number, id?: number, postedDate?: string) {
        this.id = id;
        this.postId = postId;
        this.commentId = commentId;
        this.userId = userId;
        this.username = username;
        this.postedDate = postedDate;
        this.message = message;
        this.user = user;
        this.post = post;
        this.comment = comment;
    }
}