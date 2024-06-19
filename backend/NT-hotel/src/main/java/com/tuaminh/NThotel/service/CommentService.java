package com.tuaminh.NThotel.service;

import com.tuaminh.NThotel.model.Comment;
import com.tuaminh.NThotel.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService{
    private final CommentRepository commentRepository;
    @Override
    public Comment saveComment(String commentStr) {
        Comment comment = new Comment();
        comment.setCommentStr(commentStr);
        return commentRepository.save(comment);
    }

    @Override
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
