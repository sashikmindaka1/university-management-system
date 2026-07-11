package com.example.universityManagement.controller;

import com.example.universityManagement.model.Lecturer;
import com.example.universityManagement.service.LecturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lecturers")
public class LecturerController {

    @Autowired
    private LecturerService lecturerService;

    @GetMapping
    public List<Lecturer> getAllLecturers() {
        return lecturerService.getAllLecturers();
    }

    @PostMapping
    public Lecturer createLecturer(@RequestBody Lecturer lecturer) {
        return lecturerService.saveLecturer(lecturer);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lecturer> getLecturerById(@PathVariable Long id) {
        Lecturer lecturer = lecturerService.getLecturerById(id);
        if (lecturer != null) {
            return ResponseEntity.ok(lecturer);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLecturer(@PathVariable Long id) {
        lecturerService.deleteLecturer(id);
        return ResponseEntity.ok().build();
    }
}