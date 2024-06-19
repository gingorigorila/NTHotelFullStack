package com.tuaminh.NThotel.controller;

import com.tuaminh.NThotel.model.Comment;
import com.tuaminh.NThotel.response.CommentResponse;
import com.tuaminh.NThotel.service.ICommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {
    private final ICommentService commentService;
    @PostMapping("/add/new-comment")
    public ResponseEntity<CommentResponse> addComment(@RequestParam("commentStr") String commentStr){
        Comment savedComment = commentService.saveComment(commentStr);
        CommentResponse commentResponse = new CommentResponse(savedComment.getId(), savedComment.getCommentStr());
        return ResponseEntity.ok(commentResponse);
    }
    @GetMapping("/all-comment")
    public ResponseEntity<List<CommentResponse>> displayComment(){
        List<Comment> comments = commentService.getAllComments();
        List<CommentResponse> commentResponses = new ArrayList<>();
        for (Comment comment : comments){
            CommentResponse commentResponse = getCommentResponse(comment);
            commentResponses.add(commentResponse);
        }
        return ResponseEntity.ok(commentResponses);
    }
    @DeleteMapping("/delete-comment/{commentId}")
    public void deleteComment(@PathVariable Long commentId){
        commentService.deleteComment(commentId);
    }
    private CommentResponse getCommentResponse(Comment comment) {
        return new CommentResponse(comment.getId(),comment.getCommentStr());
    }
}
