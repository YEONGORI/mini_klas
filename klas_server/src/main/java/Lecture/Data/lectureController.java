package Lecture.Data;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Lecture")
public class lectureController {

    private Lecture.Data.lectureService lectureService;

    @GetMapping("")

}
