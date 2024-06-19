package com.tuaminh.NThotel.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentResponse {
    private Long id;
    private String commentStr;
    public CommentResponse(Long id, String commentStr){
        this.id=id;
        this.commentStr=commentStr;
    }
}
