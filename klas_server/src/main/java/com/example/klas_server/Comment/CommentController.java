package com.example.klas_server.Comment;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class CommentController {

    @Autowired
    private final CommentService commentService;

    @PostMapping("/comment")
    public ResponseEntity<HttpStatus> writeComment(@RequestBody CommentDTO data) {
        try {

            Boolean res = commentService.writeComment(data);
            if (res)
                return ResponseEntity.ok().build();
            else
                return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
