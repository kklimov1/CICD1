package com.revature.Squawk.services;

import com.revature.Squawk.models.Comment;
import com.revature.Squawk.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepo;

    @Autowired
    public CommentService(CommentRepository commentRepo) {
        this.commentRepo = commentRepo;
    }

    public Comment createComment(Comment comment){
        return commentRepo.save(comment);
    }

    public Comment getCommentById(Integer commentId) {
        return commentRepo.findByCommentId(commentId);
    }

    public List<Comment> getCommentsByPostId(Integer postId) {
        return commentRepo.findByPostId(postId);
    }

    public Comment updateComment(Comment updatedComment) {
        Comment comment = commentRepo.findByCommentId(updatedComment.getCommentId());
        comment.setMessage(updatedComment.getMessage());
        return commentRepo.save(comment);
    }

    public void deleteComment(Comment comment) {
        commentRepo.deleteByCommentId(comment.getCommentId());
    }
}
