package com.revature.Squawk.controllers;

import com.revature.Squawk.models.Comment;

import com.revature.Squawk.models.Post;
import com.revature.Squawk.models.User;
import com.revature.Squawk.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/posts")
public class CommentController {

    private final PostService postService;
    private final CommentService commentService;
    private final LogService logService;
    private final ReplyService replyService;

    @Autowired
    public CommentController(ReplyService replyService, PostService postService, CommentService commentService, LogService logService) {
        this.commentService = commentService;
        this.postService = postService;
        this.logService = logService;
        this.replyService = replyService;
    }

    
    @PostMapping(value = "/{postId}/comments")
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody Comment addComment(@PathVariable Integer postId, @RequestBody Comment comment) {
        LocalDateTime now = LocalDateTime.now();
        Post post = postService.getPost(postId);
        comment.setPost(post);
        comment.setPostedDate(now);
        Comment newComment = commentService.createComment(comment);
        logService.logMsg(String.format("%s Created comment: %s", newComment.getUsername(),newComment.getMessage()), newComment.getUser());
        return newComment;
    }

    @GetMapping(value = "/{postId}/comments")
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody List<Comment> getCommentsByPostId(@PathVariable Integer postId) {
        return commentService.getCommentsByPostId(postId);
    }


    @PutMapping(value = "/{postId}/comments")
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody Comment updateCommentById(@PathVariable Integer postId, @RequestBody Comment newComment) {
        Comment comment = commentService.getCommentById(newComment.getCommentId());
        if (comment != null && Objects.equals(comment.getPost().getPostId(), postId)) {
            comment.setMessage(newComment.getMessage());
            logService.logMsg(String.format("%s Updated comment: #%d", comment.getUsername() ,comment.getCommentId()), comment.getUser());
            return commentService.updateComment(comment);
        }

        return null;
    }

    @DeleteMapping(value = "/{postId}/comments")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteCommentById(@PathVariable Integer postId, @RequestBody Comment deleteComment) {
        Comment comment = commentService.getCommentById(deleteComment.getCommentId());
        if (comment != null && Objects.equals(comment.getPost().getPostId(), postId)) {
            replyService.deleteReplyByCommentId(comment.getCommentId());
            commentService.deleteComment(comment);
            logService.logMsg(String.format("Deleted comment: %s", comment.getUsername() ,comment.getMessage()), comment.getUser());
        }
    }
}
