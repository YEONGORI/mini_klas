package com.example.klas_server.Lecture.Notice;

import com.example.klas_server.Lecture.Material.LectureMaterialDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LectureNoticeRepository extends JpaRepository<LectureNoticeDTO, Integer> {

    List<LectureNoticeDTO> findByLectureid(Integer lectureid);
}