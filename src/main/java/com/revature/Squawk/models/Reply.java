package com.revature.Squawk.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity(name = "replies")
public class Reply {
    @Id
    @Column(name = "reply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer replyId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonBackReference(value = "reply_post")
    @JoinColumn(name = "post_id")
    @JsonProperty
    private Post post;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference(value = "reply_user")
    @JoinColumn(name = "user_id")
    @JsonProperty
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonBackReference(value = "reply_comment")
    @JoinColumn(name = "comment_id")
    @JsonProperty
    private Comment comment;

    @Column(name = "posted_date")
    private LocalDateTime postedDate;

    @Column
    private String message;

    public Reply() {
    }

    public Reply(Post post, User user, Comment comment, LocalDateTime postedDate, String message) {
        this.post = post;
        this.user = user;
        this.comment = comment;
        this.postedDate = postedDate;
        this.message = message;
    }

    public Reply(Integer replyId, Post post, User user, Comment comment, LocalDateTime postedDate, String message) {
        this.replyId = replyId;
        this.post = post;
        this.user = user;
        this.comment = comment;
        this.postedDate = postedDate;
        this.message = message;
    }

    public Integer getReplyId() {
        return replyId;
    }

    public void setReplyId(Integer replyId) {
        this.replyId = replyId;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public LocalDateTime getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDateTime postedDate) {
        this.postedDate = postedDate;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getCommentId() {
        return comment.getCommentId();
    }

    public Integer getPostId() {
        return post.getPostId();
    }

    public String getUsername() {
        return user.getUsername();
    }

    public Integer getUserId() {
        return user.getUserId();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reply reply = (Reply) o;
        return Objects.equals(replyId, reply.replyId) && Objects.equals(post, reply.post) && Objects.equals(user, reply.user) && Objects.equals(comment, reply.comment) && Objects.equals(postedDate, reply.postedDate) && Objects.equals(message, reply.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(replyId, post, user, comment, postedDate, message);
    }

    @Override
    public String toString() {
        return "Reply{" +
                "replyId=" + replyId +
                ", postedDate=" + postedDate +
                ", message='" + message + '\'' +
                '}';
    }
}
