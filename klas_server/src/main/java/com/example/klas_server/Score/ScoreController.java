package com.example.klas_server.Score;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/score")
@RequiredArgsConstructor
public class ScoreController {
    private final ScoreService scoreService;

    @GetMapping
    public ResponseEntity<List<GetScoreResponse>> GetScore(@RequestBody final Map<String, Integer> req) {
        List<GetScoreResponse> list = scoreService.GetUserScore(req.get("userId"));
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @PostMapping
    public ResponseEntity<Void> SetScore(@RequestBody final SetScoreRequest req) {
        scoreService.SetUserScore(req);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
