package com.revature.Squawk.repositories;

import com.revature.Squawk.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query(value = "SELECT * FROM posts WHERE post_id = :postId", nativeQuery = true)
    Post findByPostId(@Param("postId") Integer postId);

    @Query(value = "SELECT * FROM posts WHERE user_Id = :userId", nativeQuery = true)
    public List<Post> findByUserId(@Param("userId") Integer userId);
}
