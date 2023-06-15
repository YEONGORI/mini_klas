package com.example.klas_server.Lecture.Register;

import com.example.klas_server.Lecture.Lecture.LectureDTO;
import com.example.klas_server.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LectureRegisterRepository extends JpaRepository<LectureRegisterDTO, Integer> {
    List<LectureRegisterDTO> findByUser(User user);
}
