package com.example.klas_server.Lecture.Lecture;

import com.example.klas_server.Lecture.Plan.LecturePlanDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
public class LectureService {
    @Autowired
    private LectureRepository lectureRepository;

    public LectureDTO saveLecture(LectureDTO lecture){
        return (LectureDTO) lectureRepository.save(lecture);
    }

    public List<LectureDTO> printLectureList() {

        try {
            System.out.println("asdfdsafasdfasd11");
            List<LectureDTO> list = lectureRepository.findAll();
            System.out.println("asdfdsafasdfasd22");
            System.out.println(list);
            System.out.println("asdfdsafasdfasd33");
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    public List<LectureDTO> printLectureListByParameter(LectureDTO data) {

        try {
            log.info(data.getProfessor());
            log.info(data.getLecturename());
            if(data.getProfessor()=="")
            {
                List<LectureDTO> list = lectureRepository.findByLecturename(data.getLecturename());
                return list;
            }
            else if(data.getLecturename()=="")
            {
                List<LectureDTO> list = lectureRepository.findByProfessor(data.getProfessor());
                return list;
            }
            else
            {
                List<LectureDTO> list = lectureRepository.findByLecturenameAndProfessor(data.getLecturename(), data.getProfessor());
                return list;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
