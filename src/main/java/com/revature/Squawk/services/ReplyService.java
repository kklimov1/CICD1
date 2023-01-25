package com.revature.Squawk.services;

import com.revature.Squawk.models.Reply;
import com.revature.Squawk.repositories.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyService {
    private final ReplyRepository replyRepo;

    @Autowired
    public ReplyService(ReplyRepository replyRepo) {
        this.replyRepo = replyRepo;
    }

    public Reply createReply(Reply reply) {
        return replyRepo.save(reply);
    }

    public Reply getByReplyId(Integer replyId) {
        return replyRepo.findByReplyId(replyId);
    }

    public List<Reply> getRepliesByCommentId(Integer postId, Integer commentId) {
        return replyRepo.findByCommentId(postId, commentId);
    }

    public Reply updateReply(Reply updatedReply) {
        Reply reply = replyRepo.findByReplyId(updatedReply.getReplyId());
        reply.setMessage(updatedReply.getMessage());
        return replyRepo.save(reply);
    }

    public void deleteReply(Reply reply) {
        replyRepo.deleteByReplyId(reply.getReplyId());
    }

    public void deleteReplyByCommentId(Integer commentId) {
        replyRepo.deleteByCommentId(commentId);
    }
}
