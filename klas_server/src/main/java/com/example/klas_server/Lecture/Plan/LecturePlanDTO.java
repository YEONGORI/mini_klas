package com.example.klas_server.Lecture.Plan;

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
    private int id;
    private int lecture_id;
    @Column(name = "summary")
    private String summary;
    @Column(name = "evaluation_ratio")
    private String evaluation_ratio;
    @Column(name = "textbook")
    private Date textbook;

}