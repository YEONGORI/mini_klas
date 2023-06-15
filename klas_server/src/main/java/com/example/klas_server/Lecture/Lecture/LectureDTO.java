package com.example.klas_server.Lecture.Lecture;

import com.example.klas_server.Lecture.Register.LectureRegisterDTO;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
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

    @Column(name = "coursequota")
    private int coursequota;

    @OneToMany(mappedBy = "lectureDTO", fetch = FetchType.LAZY)
    private List<LectureRegisterDTO> lectureRegisterDTOList;

    public LectureDTO(String lecturename, String time, String type, Integer limit, String professor, String credit, String contact, Integer coursequota) {
        this.lecturename = lecturename;
        this.time = time;
        this.type = type;
        this.limit = limit;
        this.professor = professor;
        this.credit = credit;
        this.contact = contact;
        this. coursequota = coursequota;
    }
}
