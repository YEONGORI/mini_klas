package com.example.klas_server.Lecture.Assignment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@Table(name = "lecture_assignment")
public class LectureAssignmentDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "assignmentid")
    private int assignmentid;

    @Column(name = "lectureid")
    private int lectureid;
    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "attachmentname")
    private String attachmentname;

    @Column(name = "attachmentaddress")
    private String attachmentaddress;

    @Column(name = "deadline")
    private String deadline;
    @Column(name = "status")
    private String status;

    @Column(name = "userid")
    private int userid;
    @Column(name = "author")
    private String author;
    @Column(name = "date")
    private String date;



}
