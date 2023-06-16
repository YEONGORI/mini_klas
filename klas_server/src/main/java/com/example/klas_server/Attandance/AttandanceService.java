package com.example.klas_server.Attandance;

import com.example.klas_server.Lecture.Lecture.LectureDTO;
import com.example.klas_server.Lecture.Lecture.LectureRepository;
import com.example.klas_server.User.User;
import com.example.klas_server.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AttandanceService {
    private final AttandanceRepository attandanceRepository;
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;

    public void saveAttandance(Integer userId, Integer lectureId, LocalDate attandanceDate) {
        User user = userRepository.findByUserId(userId).orElse(null);
        LectureDTO lectureDTO = lectureRepository.findById(lectureId).orElse(null);

        if (user != null && lectureDTO != null) {
            attandanceRepository.save(Attandance.builder()
                    .user(user)
                    .lectureDTO(lectureDTO)
                    .attendanceDate(attandanceDate)
                    .build());
        }
    }
}
