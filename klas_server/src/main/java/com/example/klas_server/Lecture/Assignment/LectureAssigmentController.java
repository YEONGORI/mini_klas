package com.example.klas_server.Lecture.Assignment;


import com.example.klas_server.Lecture.Material.LectureMaterialDTO;
import com.example.klas_server.Lecture.Material.LectureMaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lecture/assignment")
@CrossOrigin
public class LectureAssigmentController {


    private final LectureAssignmentService lectureAssignmentService;

    @PostMapping("/write")
    public ResponseEntity<LectureAssignmentDTO> saveLectureAssignment(@RequestBody LectureAssignmentDTO data )
    {
        try {


            LectureAssignmentDTO result = lectureAssignmentService.saveLectureAssignment(data);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PostMapping("/list")
    public ResponseEntity<List<LectureAssignmentDTO>> getLectureAssignmentsByParameter(@RequestBody LectureAssignmentDTO data )
    {

        try {
            System.out.println(data);
            List<LectureAssignmentDTO> result = lectureAssignmentService.getLectureAssignmentsByParameter(data);
            if (result.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/list/student")
    public ResponseEntity<List<LectureAssignmentDTO>> getLectureAssignmentsByParameterForStudent(@RequestBody LectureAssignmentDTO data )
    {

        try {
            System.out.println(data);
            List<LectureAssignmentDTO> result = lectureAssignmentService.getLectureAssignmentsByParameterForStudent(data);
            if (result.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/student")
    public ResponseEntity<LectureAssignmentDTO> getLectureAssignmentOneByParameterForStudent(@RequestBody LectureAssignmentDTO data )
    {

        try {
            System.out.println(data);
            LectureAssignmentDTO result = lectureAssignmentService.getLectureAssignmentOneByParameterForStudent(data);
            if (result.getUserid() == 0)
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/delete")
    public ResponseEntity deleteLectureAssignment(@RequestBody LectureAssignmentDTO data )
    {
        try {




            Long result = lectureAssignmentService.deleteLectureAssignment(data);
            if (result==0)
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            else if (result==null)
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



}
