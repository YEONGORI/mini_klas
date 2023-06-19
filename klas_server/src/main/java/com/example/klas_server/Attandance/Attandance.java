package com.example.klas_server.Attandance;

import com.example.klas_server.Lecture.Lecture.LectureDTO;
import com.example.klas_server.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "attandance")
public class Attandance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "lectureid", referencedColumnName = "id")
    private LectureDTO lectureDTO;

    @Column(name = "attendancedate")
    private LocalDate attendanceDate;
}
