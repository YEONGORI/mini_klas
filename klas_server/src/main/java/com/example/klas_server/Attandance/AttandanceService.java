package com.example.klas_server.Attandance;

import com.example.klas_server.Lecture.Lecture.LectureDTO;
import com.example.klas_server.Lecture.Lecture.LectureRepository;
import com.example.klas_server.Lecture.Register.LectureRegisterDTO;
import com.example.klas_server.Lecture.Register.LectureRegisterRepository;
import com.example.klas_server.User.User;
import com.example.klas_server.User.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttandanceService {
    private final UserRepository userRepository;
    private final LectureRegisterRepository lectureRegisterRepository;

    public void getAttandance(final Integer userId) {
        User user = userRepository.findByUserId(userId).orElse(null);
        List<LectureRegisterDTO> list =  lectureRegisterRepository.findByUser(user);
    }

    public void checkAttandance(CheckAttandanceRequest req) {
        return;
    }
}
