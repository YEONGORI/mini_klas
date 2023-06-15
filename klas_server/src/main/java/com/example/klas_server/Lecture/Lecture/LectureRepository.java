package com.example.klas_server.Lecture.Lecture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface LectureRepository extends JpaRepository<LectureDTO, Integer> {

    List<LectureDTO> findByLecturename(String lecturename);
    List<LectureDTO> findAll();

    LectureDTO findById(int id);

    List<LectureDTO> findByProfessor(String professor);
    List<LectureDTO> findByLecturenameAndProfessor(String lecturename, String professor);
}
