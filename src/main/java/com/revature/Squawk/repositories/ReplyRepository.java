package com.revature.Squawk.repositories;

import com.revature.Squawk.models.Reply;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface ReplyRepository extends JpaRepository<Reply, Integer> {
    // find by reply id
    Reply findByReplyId(Integer replyId);

    // find all replies by post id and comment id
    @Query(value = "SELECT * FROM replies WHERE post_id = :postId AND comment_id = :commentId", nativeQuery = true)
    List<Reply> findByCommentId(@Param("postId") Integer postId, @Param("commentId") Integer commentId);

    // delete by reply id
    @Query(value = "DELETE FROM replies WHERE reply_id = :replyId", nativeQuery = true)
    @Modifying
    void deleteByReplyId(@Param("replyId") Integer replyId);

    // delete all by comment id
    @Query(value = "DELETE FROM replies WHERE comment_id = :commentId", nativeQuery = true)
    @Modifying
    void deleteByCommentId(@Param("commentId") Integer commentId);
}
