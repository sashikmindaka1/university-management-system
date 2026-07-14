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



    // Get all lecturers
    @GetMapping
    public List<Lecturer> getAllLecturers(){

        return lecturerService.getAllLecturers();

    }



    // Create lecturer
    @PostMapping
    public Lecturer createLecturer(
            @RequestBody Lecturer lecturer
    ){

        return lecturerService.saveLecturer(lecturer);

    }



    // Get lecturer by id
    @GetMapping("/{id}")
    public ResponseEntity<Lecturer> getLecturerById(
            @PathVariable Long id
    ){

        Lecturer lecturer = lecturerService.getLecturerById(id);


        if(lecturer != null){

            return ResponseEntity.ok(lecturer);

        }


        return ResponseEntity.notFound().build();

    }



    // Delete lecturer
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLecturer(
            @PathVariable Long id
    ){

        lecturerService.deleteLecturer(id);


        return ResponseEntity.ok(
                "Lecturer deleted"
        );

    }


}