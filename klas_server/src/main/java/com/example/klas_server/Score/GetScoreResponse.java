package com.example.klas_server.Score;

import com.example.klas_server.Lecture.Lecture.LectureDTO;

import java.util.List;

public record GetScoreResponse(String semester, Float grade, List<String> table) {
}
