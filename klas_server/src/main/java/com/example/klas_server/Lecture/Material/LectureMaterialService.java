package com.example.klas_server.Lecture.Material;

import com.example.klas_server.Lecture.Lecture.LectureDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Slf4j
@Service
public class LectureMaterialService {


    @Autowired
    private LectureMaterialRepository lectureMaterialRepository;

    public LectureMaterialDTO saveLectureMaterial(LectureMaterialDTO data){
        log.info(data.getMaterialaddress());
        return (LectureMaterialDTO) lectureMaterialRepository.save(data);
    }
    public void deleteLectureMaterial(LectureMaterialDTO data) {
        lectureMaterialRepository.delete(data);
    }

    public List<LectureMaterialDTO> printLectureMaterialsByParameter(LectureMaterialDTO data) {

        try {
            //log.info(data.getLectureid());

            List<LectureMaterialDTO> list = lectureMaterialRepository.findByLectureid(data.getLectureid());
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
