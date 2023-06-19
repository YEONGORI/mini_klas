package com.example.klas_server.Board;

import com.example.klas_server.Comment.CommentDTO;
import com.example.klas_server.Lecture.Register.LectureRegisterDTO;
import com.example.klas_server.User.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString(exclude = "user")
@NoArgsConstructor
@Table(name = "board")
public class BoardDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;
    @Column(name = "date")
    private String date;

    @OneToMany(mappedBy = "boardDTO", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CommentDTO> commentDTOList;


    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;

    public BoardDTO(String title, String content, String date, User user) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.user = user;
    }
    public BoardDTO(Integer id, String title, String content, String date, User user) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.user = user;
    }
}
