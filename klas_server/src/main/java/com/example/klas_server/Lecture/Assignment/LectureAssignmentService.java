package com.example.klas_server.Lecture.Assignment;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class LectureAssignmentService {
    @Autowired
    private LectureAssignmentRepository lectureAssignmentRepository;

    public LectureAssignmentDTO saveLectureAssignment(LectureAssignmentDTO data){
        log.info(data.getAttachmentaddress());
        return (LectureAssignmentDTO) lectureAssignmentRepository.save(data);

    }

    public List<LectureAssignmentDTO> getLectureAssignmentsByParameter(LectureAssignmentDTO data) {

        try {
            log.info(data.getStatus());

            List<LectureAssignmentDTO> list = lectureAssignmentRepository.findByLectureidAndStatus(data.getLectureid(),data.getStatus());
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<LectureAssignmentDTO> getLectureAssignmentsByParameterForStudent(LectureAssignmentDTO data) {

        try {
            log.info(data.getStatus());

            List<LectureAssignmentDTO> list = lectureAssignmentRepository.findByLectureidAndAssignmentidAndStatus(data.getLectureid(), data.getAssignmentid(), data.getStatus());
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    public LectureAssignmentDTO getLectureAssignmentOneByParameterForStudent(LectureAssignmentDTO data) {

        try {

            LectureAssignmentDTO list = lectureAssignmentRepository.findByLectureidAndAssignmentidAndStatusAndUserid(data.getLectureid(), data.getAssignmentid(), data.getStatus(),data.getUserid());


            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    @Transactional
    public Long deleteLectureAssignment(LectureAssignmentDTO data) {

        try {

             Long result = lectureAssignmentRepository.deleteAllByAssignmentidAndLectureid(data.getAssignmentid(),data.getLectureid());

             System.out.println(result);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }



}
