package com.example.klas_server.Lecture.Plan;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lecture/plan")
@CrossOrigin
public class LecturePlanController {

    private final LecturePlanService lecturePlanService;
    @GetMapping("/listforstudent")
    public ResponseEntity <List<LecturePlanDTO>> getLecturePlans()
    {

        try {

            List<LecturePlanDTO> result = lecturePlanService.printPlanListForStudent();
            if (result.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/lectureDetail")
    public ResponseEntity <LecturePlanDTO> getLecturePlanDetail(@RequestBody LecturePlanDTO data)
    {
        try {
            System.out.println(data);

            LecturePlanDTO result = lecturePlanService.getLecturePlanDetail(data.getLectureid());
            if (result.equals(""))
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/listforstudent")
    public ResponseEntity<HttpStatus> registerLecturePlans(@RequestBody LecturePlanDTO info)
    {
        try{
            lecturePlanService.saveLecturePlan(info);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}