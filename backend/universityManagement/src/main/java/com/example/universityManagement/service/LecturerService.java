package com.example.universityManagement.service;

import com.example.universityManagement.model.Lecturer;
import com.example.universityManagement.repository.LecturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LecturerService {

    @Autowired
    private LecturerRepository lecturerRepository;

    public List<Lecturer> getAllLecturers() {
        return lecturerRepository.findAll();
    }

    public Lecturer saveLecturer(Lecturer lecturer) {
        return lecturerRepository.save(lecturer);
    }

    public Lecturer getLecturerById(Long id) {
        Optional<Lecturer> lecturer = lecturerRepository.findById(id);
        return lecturer.orElse(null);
    }

    public void deleteLecturer(Long id) {
        lecturerRepository.deleteById(id);
    }
}