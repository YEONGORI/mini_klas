package com.example.klas_server.Lecture.Lecture;

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
@Table(name = "lecture")
public class LectureDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "lecturename")
    private String lecturename;

    @Column(name = "time")
    private String time;
    @Column(name = "type")
    private String type;

    @Column(name = "limit")
    private int limit;

    @Column(name = "professor")
    private String professor;

    @Column(name = "credit")
    private String credit;

    @Column(name = "contact")
    private String contact;


}
