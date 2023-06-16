package com.example.klas_server.Score;


public record SetScoreRequest(String semester, Integer userId, String grade, Integer lectureId) {
}