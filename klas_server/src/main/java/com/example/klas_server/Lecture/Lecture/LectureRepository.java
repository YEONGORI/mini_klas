package com.example.klas_server.Lecture.Lecture;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureRepository extends JpaRepository<LectureDTO, Integer> {
}
