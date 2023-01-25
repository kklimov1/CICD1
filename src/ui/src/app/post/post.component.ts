import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Post, PostsService } from '../Services/posts.service';
import { Comment } from '../comment';
import { CommentsService } from 'app/Services/comments.service';
import { CookieService } from 'app/Services/cookie-service.service';
import { User } from 'app/model/user';
import { Reply } from 'app/reply';
import { UsersService } from 'app/Services/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input()
  post!: Post;

  @Input()
  posts!: Post[]

  @Input()
  removePostFromFeed!: Function;

  comments: Comment[] = [];
  canDelete: boolean = false;

  clicked: boolean = false;
  
  currentUser: User | undefined;
  profilePic: string | undefined | null = 'assets/profilepic.jpg';

  constructor(
    private postsService: PostsService,
    private commentService: CommentsService,
    public _sanitizer: DomSanitizer,
    private cookieService: CookieService,
    private userService: UsersService
  ) { }

  embedYoutube: Boolean = false;
  youtubeLink!: string;
  safeYoutubeLink!: SafeResourceUrl;

  ngOnInit(): void {
    this.canDelete = (this.cookieService.getCurrentUser()?.userId == this.post.userId);
    this.youtubeLink = this.parseForYoutube(this.post.message) || this.youtubeLink;
    this.safeYoutubeLink = this._sanitizer.bypassSecurityTrustResourceUrl(this.youtubeLink);
  }

  createComment(post: Post, message: string) {
    let user: User | undefined = this.cookieService.getCurrentUser();
    if (user == undefined) {
      alert('Must be signed in to create comments');
    } else if (user) {
      let comment = new Comment((post.postId ? post.postId : 1), (user.userId ? user.userId : 1), message, user, post);
      this.commentService.postComment((post.postId ? post.postId : 1), comment).subscribe((comment) => {
        this.post.comments.push(comment);
        this.commentService.getComments(this.post.postId ? this.post.postId : 1);
      });
    }

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

  clickMoreComments(post: Post): void {
    post.clicked = true;
    this.clicked = true;
  }

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

  deletePost(post: Post): void {
    try {
      this.postsService.deletePostById(post.postId!);
    }
    catch (err: any) {
      console.log(err);
    }
    finally {
      this.removePostFromFeed(post);
    }
  }

  parseForYoutube(message: String) {
    if (message.includes("youtube.com/watch?v=")) {
      let cutoff = message.lastIndexOf("youtube.com/watch?v=") + 20;
      let valid = /^[-a-zA-Z0-9_]*$/;
      try {
        for (let i = cutoff; i < message.length; i++) {
          if (!message[i].match(valid)) {
            this.embedYoutube = true;
            return "https://youtube.com/embed/" + message.slice(cutoff, i);
          }
        }
        this.embedYoutube = true;
        return "https://youtube.com/embed/" + message.slice(cutoff);
      }
      catch (err: any) {
        console.log(err);
        return '';
      }
    }
      return '';
  }
}
