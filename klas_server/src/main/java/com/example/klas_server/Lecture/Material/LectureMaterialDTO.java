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
    private int lecture_id;
    @Column(name = "title")
    private String title;
    @Column(name = "content")
    private String content;

    @Column(name = "material_address")
    private Date material_address;
}
