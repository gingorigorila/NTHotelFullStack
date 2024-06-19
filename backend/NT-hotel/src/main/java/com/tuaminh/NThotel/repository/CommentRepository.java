package com.tuaminh.NThotel.repository;

import com.tuaminh.NThotel.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {

}
