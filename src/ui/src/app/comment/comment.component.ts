import { Component, Input } from '@angular/core';
import { Comment } from '../comment';
import { Post } from 'app/Services/posts.service';
import { CommentsService } from 'app/Services/comments.service';
import { Reply } from 'app/reply';
import { User } from 'app/model/user';
import { CookieService } from 'app/Services/cookie-service.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  constructor(
    private commentService: CommentsService,
    private cookieService: CookieService
  ) { }

  @Input() post!: Post;
  @Input() comments!: Comment[];
  @Input() commentId!: number;

  @Input() comment!: Comment;
  @Input() reply!: Reply;

  canDeleteComment(comment: Comment): boolean {
    return this.cookieService.getCurrentUser()?.userId == comment.userId;
  }

  canDeleteReply(reply: Reply): boolean {
    return this.cookieService.getCurrentUser()?.userId == reply.userId;
  }

  deleteComment(comment: Comment) {
    this.commentService.deleteComment(comment.postId, comment).subscribe();
    this.post.comments.forEach((value, index) => {
      if (value === comment) {
        this.post.comments.splice(index, 1);
      }
    });
  }

  createReply(post: Post, comment: Comment, message: string) {
    let user: User | undefined = this.cookieService.getCurrentUser();
    if (user == undefined) {
      alert('Must be signed in to create replies');
    } else if (user) {
      let reply = new Reply((comment.commentId ? comment.commentId : 1), (user.userId ? user.userId : 1), message, (user.username ? user.username : "test"), post, comment, user, post.postId);
      this.commentService.postReply(comment.postId, (comment.commentId ? comment.commentId : 1), comment, reply).subscribe((reply) => {
        this.post.comments.forEach((value, index) => {
          if (value === comment) {
            if (this.post.comments[index].replies === null) {
              this.post.comments[index].replies = [];
            }

            this.post.comments[index].replies?.push(reply);
            this.commentService.getReplies((reply.postId ? reply.postId : 1), reply.commentId);
          }
        });
      });
    }
  }

  deleteReply(comment: Comment, reply: Reply) {
    let i: number = 0;
    this.commentService.deleteReply((reply.postId ? reply.postId : 1), reply.commentId, reply).subscribe();
    this.post.comments.forEach((value, index) => {
      if (value === comment) {
        this.post.comments[index].replies?.forEach((v, i) => {
          if (v === reply) {
            this.post.comments[index].replies?.splice(i, 1);
          }
        })
      }
    });
  }
}
