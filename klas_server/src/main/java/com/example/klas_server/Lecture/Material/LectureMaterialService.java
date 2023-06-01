package com.example.klas_server.Lecture.Material;

public class LectureMaterialService {

    private LectureMaterialRepository lectureMaterialRepository;

    public LectureMaterialDTO saveLectureMaterial(LectureMaterialDTO lectureMaterial){
        return (LectureMaterialDTO) lectureMaterialRepository.save(lectureMaterial);
    }
}
