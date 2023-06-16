package com.example.klas_server.Score;

import com.example.klas_server.Lecture.Lecture.LectureDTO;
import com.example.klas_server.Lecture.Lecture.LectureRepository;
import com.example.klas_server.Lecture.Register.LectureRegisterDTO;
import com.example.klas_server.Lecture.Register.LectureRegisterRepository;
import com.example.klas_server.User.User;
import com.example.klas_server.User.UserRepository;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ScoreService {
    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;
    private final LectureRepository lectureRepository;

    public List<GetScoreResponse> GetUserScore(Integer userId) {
        User user = userRepository.findByUserId(userId).get();
        List<Score> scores = scoreRepository.findByUser(user).get();
        Map<String, Float> grading = new HashMap<>();
        Map<String, List<String>> lecture = new HashMap<>();
        for (Score s: scores) {
            grading.put(s.getSemester(), grading.get(s.getSemester()) +  Float.parseFloat(s.getGrade()));
        }
        for (Score s: scores) {
            if (lecture.get(s.getSemester()).isEmpty())
                lecture.put(s.getSemester(), new ArrayList<>());
            List<String> list = List.of(Integer.toString(s.getLectureDTO().getId()), s.getLectureDTO().getLecturename(), s.getLectureDTO().getMajor(), s.getLectureDTO().getType(), s.getLectureDTO().getCredit(), s.getGrade());
            lecture.put(s.getSemester(), list);
        }
        List<GetScoreResponse> list = new ArrayList<>();
        return null;//////////////////////////////////////////////
    }

    public void SetUserScore(SetScoreRequest req) {
        User user = userRepository.findByUserId(req.userId()).get();
        LectureDTO lectureDTO = lectureRepository.findById(req.lectureId()).get();

        scoreRepository.save(Score.builder()
                .semester(req.semester())
                .user(user)
                .grade(req.grade())
                .lectureDTO(lectureDTO)
                .build()
        );
    }
}
