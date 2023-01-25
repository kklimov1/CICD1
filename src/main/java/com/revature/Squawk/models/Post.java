package com.revature.Squawk.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity(name = "Posts")
public class Post {
    @Id
    @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postId;

    @Column(length = 1000)
    private String message;

    @Column(name = "image_link", length = 1000)
    private String imageLink;

    @Column(name = "date_posted")
    private LocalDateTime datePosted;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference(value = "post_user")

    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "post")
    @JsonManagedReference (value = "like_post")
    List<Like> likes;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "post")
    @JsonManagedReference (value = "comment_post")
    List<Comment> comments;

    public Post() {
    }

    public Post(String message, String imageLink, LocalDateTime datePosted, User user) {
        this.message = message;
        this.imageLink = imageLink;
        this.datePosted = datePosted;
        this.user = user;
    }

    public Post(Integer postId, String message, String imageLink, LocalDateTime datePosted, User user) {
        this.postId = postId;
        this.message = message;
        this.imageLink = imageLink;
        this.datePosted = datePosted;
        this.user = user;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public LocalDateTime getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(LocalDateTime datePosted) {
        this.datePosted = datePosted;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getUserId() {
        return this.user != null ? user.getUserId() : null;
    }
    public String getUsername() {
        return user.getUsername();
    }

    public String getImage() {
        return user.getImage();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return Objects.equals(postId, post.postId) && Objects.equals(message, post.message) && Objects.equals(imageLink, post.imageLink) && Objects.equals(datePosted, post.datePosted) && Objects.equals(user, post.user) && Objects.equals(likes, post.likes) && Objects.equals(comments, post.comments);
    }

    @Override
    public int hashCode() {
        return Objects.hash(postId, message, imageLink, datePosted, user, likes, comments);
    }

    @Override
    public String toString() {
        return "Post{" +
                "postId=" + postId +
                ", message='" + message + '\'' +
                ", imageLink='" + imageLink + '\'' +
                ", datePosted=" + datePosted +
                '}';
    }
}