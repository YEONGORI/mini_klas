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
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Slf4j
@Service
public class LectureRegisterService {
    @Autowired
    private LectureRegisterRepository lectureRegisterRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private UserRepository userRepository;

    public int register(LectureRegisterDTO data)
    {

        int lectureid = data.getLectureDTO().getId();
        int userid = data.getUser().getUserId();

        LectureDTO targetlecture = lectureRepository.findById(lectureid);
        Optional<User> check = userRepository.findByUserId(userid);
        User user = check.get();
        List<LectureRegisterDTO> lecturelist = lectureRegisterRepository.findByUser(user);

        boolean checked = Dupchecked(lecturelist, lectureid);
        if(checked)//중복될 경우
            return 0;
        int coursequota = targetlecture.getCoursequota();
        int limit = targetlecture.getLimit();


        System.out.println(data);
        if(coursequota<limit){
            System.out.println("hihihih");
            targetlecture.setCoursequota(targetlecture.getCoursequota()+1);
            lectureRegisterRepository.save(new LectureRegisterDTO(user, targetlecture));
            return 1;//수강신청 성공
        }
        System.out.println("hihihihasdfasdf");
        return 2;//강의 만석
    }

    boolean Dupchecked(List<LectureRegisterDTO> list, int lectureid){
        for(int i=0;i<list.size();i++){
            if(list.get(i).getLectureDTO().getId()==lectureid)//duplicate
                return true;
        }
        return false;//not duplicate
    }

}
