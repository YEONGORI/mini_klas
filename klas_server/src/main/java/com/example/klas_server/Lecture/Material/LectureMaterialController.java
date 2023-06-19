package com.example.klas_server.Lecture.Material;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/lecture/material")
@CrossOrigin
public class LectureMaterialController {

    private final LectureMaterialService lectureMaterialService;

    @PostMapping("/delete")
    public ResponseEntity deleteLectureMaterial(@RequestBody LectureMaterialDTO data )
    {
        try {




            lectureMaterialService.deleteLectureMaterial(data);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/write")
    public ResponseEntity<LectureMaterialDTO>saveLectureMaterial(@RequestBody LectureMaterialDTO data )
    {
        try {




            LectureMaterialDTO result = lectureMaterialService.saveLectureMaterial(data);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PostMapping("/list")
    public ResponseEntity<List<LectureMaterialDTO>> getLectureMaterialsByParameter(@RequestBody LectureMaterialDTO data )
    {

        try {




            List<LectureMaterialDTO> result = lectureMaterialService.printLectureMaterialsByParameter(data);
            if (result.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
