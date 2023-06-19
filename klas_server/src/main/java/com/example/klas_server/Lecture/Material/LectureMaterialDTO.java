package com.example.klas_server.Lecture.Material;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "lecture_material")
public class LectureMaterialDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "lectureid")
    private int lectureid;
    @Column(name = "title")
    private String title;
    @Column(name = "content")
    private String content;

    @Column(name = "materialname")
    private String materialname;

    @Column(name = "materialaddress")
    private String materialaddress;
    @Column(name = "author")
    private String author;
    @Column(name = "date")
    private String date;
}
