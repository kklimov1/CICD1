package com.revature.Squawk.repositories;

import com.revature.Squawk.models.Comment;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    // find by comment id
    Comment findByCommentId(Integer commentId);

    // find all comments by post id
    @Query(value = "SELECT * FROM comments WHERE post_id = :postId ORDER BY posted_date", nativeQuery = true)
    List<Comment> findByPostId(@Param("postId") Integer postId);



    // delete by comment id
    @Query(value = "DELETE FROM comments WHERE comment_id = :commentId", nativeQuery = true)
    @Modifying
    void deleteByCommentId(@Param("commentId") Integer commentId);
}
