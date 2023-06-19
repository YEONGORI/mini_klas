package com.example.klas_server.Lecture.Notice;

import com.example.klas_server.Lecture.Material.LectureMaterialDTO;
import com.example.klas_server.Lecture.Material.LectureMaterialRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
public class LectureNoticeService {

    @Autowired
    private LectureNoticeRepository lectureNoticeRepository;

    public LectureNoticeDTO saveLectureNotice(LectureNoticeDTO data){
        log.info(data.getNoticefileaddress());
        return (LectureNoticeDTO) lectureNoticeRepository.save(data);
    }

    public void deleteLectureNotice(LectureNoticeDTO data) {
        lectureNoticeRepository.delete(data);
    }


    public List<LectureNoticeDTO> printLectureNoticesByParameter(LectureNoticeDTO data) {

        try {
            //log.info(data.getLectureid());

            List<LectureNoticeDTO> list = lectureNoticeRepository.findByLectureid(data.getLectureid());
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
