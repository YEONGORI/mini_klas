package Lecture.Data;

import Lecture.Data.lectureDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class lectureService {
    @Autowired
    private Lecture.Data.lectureRepository lectureRepository;

    public lectureDTO savelecture(lectureDTO lecture){
        return (lectureDTO) lectureRepository.save(lecture);
    }
}
