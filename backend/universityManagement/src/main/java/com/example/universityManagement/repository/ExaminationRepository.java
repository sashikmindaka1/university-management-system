package com.example.universityManagement.repository;


import com.example.universityManagement.model.Examination;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;



public interface ExaminationRepository extends JpaRepository<Examination, Long> {


    List<Examination> findByStudentId(Long studentId);



    Optional<Examination> findByStudentIdAndCourseId(
            Long studentId,
            Long courseId
    );


}