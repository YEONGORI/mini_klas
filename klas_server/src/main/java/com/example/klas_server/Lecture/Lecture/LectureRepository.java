package com.example.klas_server.Lecture.Lecture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LectureRepository extends JpaRepository<LectureDTO, Integer> {

    List<LectureDTO> findByLecturename(String lecturename);
    List<LectureDTO> findAll();

    Optional<LectureDTO> findById(Integer id);

    List<LectureDTO> findByProfessor(String professor);
    List<LectureDTO> findByLecturenameAndProfessor(String lecturename, String professor);
}
