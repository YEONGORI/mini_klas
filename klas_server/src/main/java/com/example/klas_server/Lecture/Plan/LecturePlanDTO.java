package com.example.klas_server.Lecture.Plan;

import com.example.klas_server.Lecture.Lecture.LectureDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "lecture_plan")
public class LecturePlanDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "lecture_id")
    private int lecture_id;

    @Column(name = "summary")
    private String summary;
    @Column(name = "attendratio")
    private int attendratio;

    @Column(name = "midexamratio")
    private int midexamratio;

    @Column(name = "finalexamratio")
    private int finalexamratio;

    @Column(name = "assignmentratio")
    private int assignmentratio;

    @Column(name = "attituderatio")
    private int attituderatio;

    @Column(name = "quizratio")
    private int quizratio;
    @Column(name = "textbook")
    private String textbook;

    @OneToOne
    @JoinTable(name = "Lecture",
    joinColumns = @JoinColumn(name = "lecture_id"),
    inverseJoinColumns = @JoinColumn(name = "id"))
    private LectureDTO lectureDTO;
}