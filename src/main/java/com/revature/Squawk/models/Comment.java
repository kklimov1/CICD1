package com.revature.Squawk.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity(name = "comments")
public class Comment {
    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference(value = "comment_post")
    @JoinColumn(name = "post_id")
    @JsonProperty
    private Post post;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference(value = "comment_user")
    @JoinColumn(name = "user_id")
    @JsonProperty
    private User user;

    @Column(name = "posted_date")
    private LocalDateTime postedDate;

    @Column
    private String message;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "comment")
    @JsonManagedReference(value = "reply_comment")
    List<Reply> replies;

    public Comment() {
    }

    public Comment(Post post, User user, LocalDateTime postedDate, String message) {
        this.post = post;
        this.user = user;
        this.postedDate = postedDate;
        this.message = message;
    }

    public Comment(Integer commentId, Post post, User user, LocalDateTime postedDate, String message) {
        this.commentId = commentId;
        this.post = post;
        this.user = user;
        this.postedDate = postedDate;
        this.message = message;
    }

    public Comment(Integer commentId, Post post, User user, LocalDateTime postedDate, String message, List<Reply> replies) {
        this.commentId = commentId;
        this.post = post;
        this.user = user;
        this.postedDate = postedDate;
        this.message = message;
        this.replies = replies;
    }

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDateTime postedDate) {
        this.postedDate = postedDate;
    }

    public List<Reply> getReplies() {
        return replies;
    }

    public void setReplies(List<Reply> replies) {
        this.replies = replies;
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
        Comment comment = (Comment) o;
        return Objects.equals(commentId, comment.commentId) && Objects.equals(post, comment.post) && Objects.equals(user, comment.user) && Objects.equals(postedDate, comment.postedDate) && Objects.equals(message, comment.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(commentId, post, user, postedDate, message);
    }

    @Override
    public String toString() {
        return "Comment{" +
                "commentId=" + commentId +
                ", datePosted=" + postedDate +
                ", message='" + message +
                '}';
    }
}