package com.revature.Squawk.services;

import com.revature.Squawk.models.Post;
import com.revature.Squawk.repositories.PostRepository;
import jdk.jfr.StackTrace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {
    private PostRepository postRepo;

    @Autowired
    public PostService(PostRepository postRepo) {
        this.postRepo = postRepo;
    }

    public Post createPost(Post post){
        try {
            return postRepo.save(post);
        }
        catch (DataAccessException e) {
            e.printStackTrace();
            return new Post();
        }
    }

    public Post getPost(Integer postId){
        try {
            return postRepo.findById(postId).orElse(new Post());
        }
        catch (DataAccessException e) {
            e.printStackTrace();
            return new Post();
        }
    }

    public List<Post> getPosts(){
        try {
            return postRepo.findAll();
        }
        catch (DataAccessException e) {
            e.printStackTrace();
            return new ArrayList<Post>();
        }
    }

    public List<Post> getPosts(Integer userId){
        try {
            return postRepo.findByUserId(userId);
        }
        catch (DataAccessException e) {
            e.printStackTrace();
            return new ArrayList<Post>();
        }
    }

    public Post updatePost(Post post){
        return new Post();
    }

    public void deletePost(Post post){

    }

    public void deletePostById(Integer postId) {
        try {
            postRepo.deleteById(postId);
        }
        catch (DataAccessException e) {
            e.printStackTrace();
        }
    }
}
