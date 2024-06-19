package com.tuaminh.NThotel.service;

import com.tuaminh.NThotel.model.Comment;

import java.util.List;

public interface ICommentService {
    Comment saveComment(String commentStr);

    List<Comment> getAllComments();

    void deleteComment(Long commentId);
}
