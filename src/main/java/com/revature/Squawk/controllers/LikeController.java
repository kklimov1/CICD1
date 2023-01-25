package com.revature.Squawk.controllers;

import com.revature.Squawk.models.Like;
import com.revature.Squawk.models.Post;
import com.revature.Squawk.models.User;
import com.revature.Squawk.services.LikeService;
import com.revature.Squawk.services.LogService;
import com.revature.Squawk.services.PostService;
import com.revature.Squawk.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/likes")
public class LikeController {
    private LikeService likeService;
    private LogService logService;
    private UserService userService;
    private PostService postService;

    @Autowired
    public LikeController(LikeService likeService, LogService logService, PostService postService, UserService userService) {
        this.likeService = likeService;
        this.logService = logService;
        this.userService = userService;
        this.postService = postService;
    }

    // allow a user to like a post, maybe return like count to update the view
    // TODO: remove commented code when confirmed no errors
    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public @ResponseBody Like likePost(@RequestBody Like like){
        System.out.println("@ controller: " + like.toString());
        //logService.logMsg("Liked a post", like.getUser());
        // instead probably change to either return like count or -1
        // like = likeService.likePost(like);
//        Integer likeCount = likeService.getLikeCount(like.getPost().getPostId());
//        System.out.println(likeCount);
        Like newLike = likeService.likePost(like);
        logService.logMsg(String.format("Post was liked: %s by %s", newLike.getPost().getMessage(), newLike.getUser().getUsername()), newLike.getUser());
        return newLike;
    }

    // check to see if a user has liked a post
    @GetMapping(value = "/{userId}/{postId}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public @ResponseBody Boolean getLike(@PathVariable Integer userId, @PathVariable Integer postId){
        // returns boolean, not currently used
        return likeService.getLikeStatus(userId, postId);
    }

    // return the like count for a post to add to the post information
    @GetMapping(value = "/count/{postId}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public @ResponseBody Integer getLikeCount(@PathVariable Integer postId){
        // NOTE the request body has to be an object type in order to be deserialized
        return likeService.getLikeCount(postId);
    }

    @DeleteMapping(value = "/{userId}/{postId}")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public Boolean deleteLike(@PathVariable Integer userId, @PathVariable Integer postId){
        User user = userService.getUser(userId);
        Post post = postService.getPost(postId);
        logService.logMsg(String.format("%s is losing a like from the message: %s", user.getUsername(), post.getMessage()), user);
        return(likeService.deleteLike(userId, postId));
    }
}
