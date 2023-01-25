package com.revature.Squawk.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.Objects;

@Entity(name = "Likes")
public class Like {

    @Id
    @Column(name = "like_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer likeId;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference(value = "like_user")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference(value = "like_post")
    @JoinColumn(name = "post_id")
    private Post post;

    public Like() {
    }

    public Like(User user, Post post) {
        this.user = user;
        this.post = post;
    }

    public Like(Integer likeId, User user, Post post) {
        this.likeId = likeId;
        this.user = user;
        this.post = post;
    }

    public Integer getLikeId() {
        return likeId;
    }

    public void setLikeId(Integer likeId) {
        this.likeId = likeId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Like like = (Like) o;
        return Objects.equals(likeId, like.likeId) && Objects.equals(user, like.user) && Objects.equals(post, like.post);
    }

    @Override
    public int hashCode() {
        return Objects.hash(likeId, user, post);
    }

    @Override
    public String toString() {
        return "Like{" +
                "likeId=" + likeId +
                ", user=" + user +
                ", post=" + post +
                '}';
    }
}
