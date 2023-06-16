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
        Map<String, Integer> subCount = new HashMap<>();
        Map<String, List<String>> lecture = new HashMap<>();
        for (Score s: scores) {
            if (grading.get(s.getSemester()) == null)
                grading.put(s.getSemester(), Float.parseFloat("0"));
            if(subCount.get(s.getSemester())==null)
                subCount.put(s.getSemester(),Integer.parseInt("0"));
            grading.put(s.getSemester(), grading.get(s.getSemester()) +  ConvertStringToFloat(s.getGrade()));
            subCount.put(s.getSemester(),subCount.get(s.getSemester())+1);
            lecture.computeIfAbsent(s.getSemester(), k -> new ArrayList<>());
            List<String> list = List.of(Integer.toString(s.getLectureDTO().getId()), s.getLectureDTO().getLecturename(), "컴퓨터정보공학과", s.getLectureDTO().getType(), s.getLectureDTO().getCredit(), s.getGrade());
            lecture.put(s.getSemester(), list);
        }
        for (Map.Entry<String, Float> entry : grading.entrySet()) {
           entry.setValue(entry.getValue() / subCount.get(entry.getKey()));
        }
        List<GetScoreResponse> list = new ArrayList<>();
        for(Map.Entry<String, Float> entry : grading.entrySet()){
            list.add(new GetScoreResponse(entry.getKey(),entry.getValue(),lecture.get(entry.getKey())));
        }
        return list;
    }

    public void SetUserScore(SetScoreRequest req) {
        System.out.println(req);
        User user = userRepository.findByUserId(req.userId()).get();
        LectureDTO lectureDTO = lectureRepository.findById(req.lectureId()).get();
        System.out.println("TEST");
        System.out.println(lectureDTO);
        scoreRepository.save(Score.builder()
                .semester(req.semester())
                .user(user)
                .grade(req.grade())
                .lectureDTO(lectureDTO)
                .build()
        );
    }

    public Float ConvertStringToFloat(String str) {
        if (str.equals("A+"))
            return 4.5F;
        else if (str.equals("A"))
            return 4F;
        else if (str.equals("B+"))
            return 3.5F;
        else if (str.equals("B"))
            return 3F;
        else if (str.equals("C+"))
            return 2.5F;
        else if (str.equals("C"))
            return 2F;
        else if (str.equals("D+"))
            return 1.5F;
        else if (str.equals("D"))
            return 1F;
        else
            return 0F;
    }
}
