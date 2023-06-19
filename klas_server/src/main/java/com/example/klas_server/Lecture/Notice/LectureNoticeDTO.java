package com.example.klas_server.Lecture.Notice;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "lecture_notice")

public class LectureNoticeDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "lectureid")
    private int lectureid;
    @Column(name = "title")
    private String title;
    @Column(name = "content")
    private String content;

    @Column(name = "noticefilename")
    private String noticefilename;

    @Column(name = "noticefileaddress")
    private String noticefileaddress;
    @Column(name = "author")
    private String author;
    @Column(name = "date")
    private String date;
}
