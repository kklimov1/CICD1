package com.revature.Squawk.controllers;

import com.revature.Squawk.models.Post;
import com.revature.Squawk.services.LogService;
import com.revature.Squawk.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.revature.Squawk.models.User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/posts")
public class PostController {

    private final PostService postService;
    private final LogService logService;


    @Autowired
    public PostController(PostService postService, LogService logService) {
        this.logService = logService;
        this.postService = postService;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public @ResponseBody Post createNewPost(@RequestBody Post post){
        post.setDatePosted(LocalDateTime.now());
        Post returnPost = postService.createPost(post);
        //Integer userId = returnPost.getUserId();
        this.logService.logMsg(String.format("%s Created a post: %s", returnPost.getUsername(), returnPost.getMessage()), returnPost.getUser());
        return returnPost;
    }
    
    @GetMapping(value = "/{postId}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public @ResponseBody Post getPost(@PathVariable Integer postId){
        Post post = postService.getPost(postId);
        System.out.println(post);
        return post;
    }

    @GetMapping(value = "/feed")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public @ResponseBody List<Post> getPosts(){
        return postService.getPosts();
    }

    @GetMapping(value = "/user")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public @ResponseBody List<Post> getUserPosts(@RequestParam Integer userId){
        return postService.getPosts(userId);
    }

    @PutMapping
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public @ResponseBody Post updatePost(@RequestBody Post post){
        logService.logMsg("Updated a post", post.getUser());
        return postService.updatePost(post);
    }

    @DeleteMapping
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deletePost(@RequestBody Post post){
        logService.logMsg(String.format("%s Deleted post: %s", post.getUsername(), post.getMessage()), post.getUser());
        postService.deletePost(post);
    }

    @DeleteMapping(value = "/{postId}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deletePostById(@PathVariable Integer postId){
        User user = postService.getPost(postId).getUser();
        logService.logMsg(String.format("%s deleted post: %s", user.getUsername(), postService.getPost(postId).getMessage()), user);
        postService.deletePostById(postId);
    }

}
