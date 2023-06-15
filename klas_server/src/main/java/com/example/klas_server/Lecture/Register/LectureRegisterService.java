package com.example.klas_server.Lecture.Register;

import com.example.klas_server.Lecture.Lecture.LectureDTO;
import com.example.klas_server.Lecture.Lecture.LectureRepository;
import com.example.klas_server.User.User;
import com.example.klas_server.User.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class LectureRegisterService {
    @Autowired
    private LectureRegisterRepository lectureRegisterRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private UserRepository userRepository;

    public Boolean register(LectureRegisterDTO data)
    {
        System.out.println("hihihihasdfasdf11");
        int lectureid = data.getLectureDTO().getId();
        int userid = data.getUser().getUserId();
        System.out.println("hihihihasdfasdf11");
        LectureDTO lecture = lectureRepository.findById(lectureid);
        System.out.println("hihihihasdfasdf222");
        User user = userRepository.findById(userid);
        System.out.println("hihihihasdfasdf333");
        int coursequota = lecture.getCoursequota();
        int limit = lecture.getLimit();

        System.out.println(data);
        if(coursequota<limit){
            System.out.println("hihihih");
            lectureRegisterRepository.save(new LectureRegisterDTO(user, lecture));
            return true;
        }
        System.out.println("hihihihasdfasdf");
        return false;
    }

}
