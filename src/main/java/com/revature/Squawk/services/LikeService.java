package com.revature.Squawk.services;

import com.revature.Squawk.models.Like;
import com.revature.Squawk.repositories.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService {
    private LikeRepository likeRepo;

    @Autowired
    public LikeService(LikeRepository likeRepo) {
        this.likeRepo = likeRepo;
    }

    public Like likePost(Like like){
        System.out.println("@ service" );
        // check for existing like here could disable on front end if user already liked post
        if (getLike(like) == null) {
            likeRepo.save(like);
            like = getLike(like);
        }
        return like;
    }

    public Like getLike(Like like){
        return likeRepo.getLike(like.getPost().getPostId(), like.getUser().getUserId());
    }

    public Like getLike(Integer userId, Integer postId){
        Like like = likeRepo.getLike(postId, userId);
        return like;
    }

    // Overload for get request parameters, returns boolean whether a user has liked a post or not
    public Boolean getLikeStatus(Integer userId, Integer postId){
        Like like = likeRepo.getLike(postId, userId);
        if (like == null) {
            return false;
        } else if (like.getLikeId() != null) {
            return true;
        }
        return false;
    }

    public Integer getLikeCount(Integer postId) {
        return likeRepo.getLikeCount(postId);
    }

    // allow users to unlike a post, return true if successful, false if not
    //do not need the return here anymore
    public boolean deleteLike(Integer userId, Integer postId){
        Like like = getLike(userId, postId);
        if (like == null) {
            return false;
        } else if (like.getLikeId() != null) {
            likeRepo.deleteById(like.getLikeId());
            return true;
        }
        return false;
    }
}
