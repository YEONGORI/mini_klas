package com.example.klas_server.Lecture.Material;

import com.example.klas_server.Lecture.Lecture.LectureDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LectureMaterialRepository extends JpaRepository<LectureMaterialDTO, Integer> {

    List<LectureMaterialDTO> findByLectureid(Integer lectureid);

}
