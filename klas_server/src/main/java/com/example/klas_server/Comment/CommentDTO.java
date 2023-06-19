package com.example.klas_server.Comment;

import com.example.klas_server.Board.BoardDTO;
import com.example.klas_server.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "comment")
public class CommentDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "content")
    private String content;
    @Column(name = "date")
    private String date;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boardid")
    private BoardDTO boardDTO;

    public CommentDTO(String content, String date, BoardDTO boardDTO) {
        this.content = content;
        this.date = date;
        this.boardDTO = boardDTO;
    }
}
