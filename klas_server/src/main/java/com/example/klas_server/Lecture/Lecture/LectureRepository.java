package com.example.klas_server.Lecture.Lecture;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface LectureRepository extends JpaRepository<LectureDTO, String> {

    List<LectureDTO> findByLecturename(String lecturename);

    List<LectureDTO> findByProfessor(String professor);
    List<LectureDTO> findByLecturenameAndProfessor(String lecturename, String professor);
}
