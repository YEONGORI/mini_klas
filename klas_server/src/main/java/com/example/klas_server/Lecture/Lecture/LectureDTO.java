package com.example.klas_server.Lecture.Lecture;

import com.example.klas_server.Attandance.Attandance;
import com.example.klas_server.Lecture.Register.LectureRegisterDTO;
import com.example.klas_server.Score.Score;
import jakarta.persistence.*;
import lombok.*;

import javax.swing.*;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    private String major;

    @Column(name = "professor")
    private String professor;

    @Column(name = "credit")
    private String credit;

    @Column(name = "contact")
    private String contact;

    @Column(name = "coursequota")
    private int coursequota;

    @OneToMany(mappedBy = "lectureDTO", fetch = FetchType.LAZY)
    private List<LectureRegisterDTO> lectureRegisterDTOList;

    @OneToMany(mappedBy = "lectureDTO", fetch = FetchType.LAZY)
    private List<Score> lectureScoreList;

    @OneToMany(mappedBy = "lectureDTO")
    private List<Attandance> attandanceList;
}
