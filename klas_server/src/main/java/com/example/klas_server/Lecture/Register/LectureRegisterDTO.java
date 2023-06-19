package com.example.klas_server.Lecture.Register;

import com.example.klas_server.Lecture.Lecture.LectureDTO;
import com.example.klas_server.User.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.checkerframework.checker.units.qual.C;

@Entity
@Getter
@Setter
@ToString(exclude = "lectureDTO")
@Table(name = "lecture_register")
@NoArgsConstructor
public class LectureRegisterDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "lecturename")
    private String lecturename;

    @Column(name = "lectureidcopy")
    private int lectureid;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lectureid")
    private LectureDTO lectureDTO;



    public LectureRegisterDTO(User user, LectureDTO lectureDTO, String lecturename, Integer lectureid) {
        this.user = user;
        this.lectureDTO= lectureDTO;
        this.lecturename = lecturename;
        this.lectureid = lectureid;
    }

}
