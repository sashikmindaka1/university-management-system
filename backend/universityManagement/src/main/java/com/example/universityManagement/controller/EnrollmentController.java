package com.example.universityManagement.controller;


import com.example.universityManagement.model.Enrollment;
import com.example.universityManagement.service.EnrollmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins="http://localhost:3001")
public class EnrollmentController {



    @Autowired
    private EnrollmentService enrollmentService;



    // Get all enrollments
    @GetMapping
    public List<Enrollment> getEnrollments(){

        return enrollmentService.getAllEnrollments();

    }





    // Add enrollment
    @PostMapping
    public Enrollment addEnrollment(
            @RequestBody Enrollment enrollment
    ){

        return enrollmentService.saveEnrollment(enrollment);

    }





    // Delete enrollment
    @DeleteMapping("/{id}")
    public String deleteEnrollment(
            @PathVariable Long id
    ){

        enrollmentService.deleteEnrollment(id);

        return "Enrollment deleted";

    }





    // Get enrollments by student
    @GetMapping("/student/{studentId}")
    public List<Enrollment> getStudentEnrollments(
            @PathVariable Long studentId
    ){

        return enrollmentService.getEnrollmentsByStudent(studentId);

    }


}