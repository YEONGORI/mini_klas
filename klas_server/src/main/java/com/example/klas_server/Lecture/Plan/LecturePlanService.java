
package com.example.klas_server.Lecture.Plan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LecturePlanService {
    @Autowired
    private LecturePlanRepository lecturePlanRepository;



    public LecturePlanDTO saveLecturePlan(LecturePlanDTO lecturePlan){
        return (LecturePlanDTO) lecturePlanRepository.save(lecturePlan);
    }

    public LecturePlanDTO getLecturePlanDetail(int lectureId){

        return lecturePlanRepository.findByLectureid(lectureId);
    }

    public List<LecturePlanDTO> printPlanListForStudent() {

        try {

            List<LecturePlanDTO> list = lecturePlanRepository.findAll();
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }



}
