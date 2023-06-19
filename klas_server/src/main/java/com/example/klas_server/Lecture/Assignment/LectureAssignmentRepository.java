package com.example.klas_server.Lecture.Assignment;
import com.example.klas_server.Lecture.Material.LectureMaterialDTO;
import com.example.klas_server.Lecture.Notice.LectureNoticeDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LectureAssignmentRepository extends JpaRepository<LectureAssignmentDTO, Integer> {


    List<LectureAssignmentDTO> findByLectureidAndStatus(Integer lectureid,String statis);

    List<LectureAssignmentDTO> findByLectureidAndAssignmentidAndStatus(Integer lectureid,Integer assignmentid,String status);
    LectureAssignmentDTO findByLectureidAndAssignmentidAndStatusAndUserid(Integer lectureid,Integer assignmentid,String status,Integer userid);
    Long  deleteAllByAssignmentidAndLectureid(Integer assignmentid, Integer lectureid);
}
