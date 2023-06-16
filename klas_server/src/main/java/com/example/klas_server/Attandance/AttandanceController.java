package com.example.klas_server.Attandance;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attendance")
@CrossOrigin
public class AttandanceController {
    private final AttandanceService attandanceService;

    @GetMapping()
    public ResponseEntity<Void> GetAttandance(@RequestBody final Map<String, Integer> req) {
        attandanceService.getAttandance(req.get("userId"));
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping()
    public ResponseEntity<Void> CheckAttandance(@RequestBody final CheckAttandanceRequest req) {
        attandanceService.checkAttandance(req);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
