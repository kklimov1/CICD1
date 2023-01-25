package com.revature.Squawk.repositories;

import com.revature.Squawk.models.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface LikeRepository extends JpaRepository<Like, Integer> {
    // allow users to like a post
    @Query(value = "INSERT INTO likes (post_id, user_id) VALUES (post_id = :postId, user_id = :userId);", nativeQuery = true)
    void likePost(
            @Param("postId") Integer postId,
            @Param("userId") Integer userId);


    // get the like count for posts
    @Query(value = "SELECT COUNT(like_id) FROM likes WHERE post_id = :postId", nativeQuery = true)
    Integer getLikeCount(@Param("postId") Integer postId);

    // test to see if a user has already liked a post
    @Query(value = "SELECT * FROM likes WHERE post_id = :postId AND user_id = :userId", nativeQuery = true)
    Like getLike(
            @Param("postId") Integer postId,
            @Param("userId") Integer userId);
}


