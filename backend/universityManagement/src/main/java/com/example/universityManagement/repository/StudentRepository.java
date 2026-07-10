package com.example.universityManagement.repository;

import com.example.universityManagement.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface StudentRepository extends JpaRepository<Student, Long> {


    Optional<Student> findByStudentId(String studentId);


}