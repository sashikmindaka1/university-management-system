package com.example.universityManagement.service;


import com.example.universityManagement.model.Enrollment;
import com.example.universityManagement.repository.EnrollmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class EnrollmentService {



    @Autowired
    private EnrollmentRepository enrollmentRepository;





    public List<Enrollment> getAllEnrollments(){

        return enrollmentRepository.findAll();

    }





    public Enrollment saveEnrollment(Enrollment enrollment){

        return enrollmentRepository.save(enrollment);

    }





    public void deleteEnrollment(Long id){

        enrollmentRepository.deleteById(id);

    }





    public List<Enrollment> getEnrollmentsByStudent(Long studentId){

        return enrollmentRepository.findByStudentId(studentId);

    }



}