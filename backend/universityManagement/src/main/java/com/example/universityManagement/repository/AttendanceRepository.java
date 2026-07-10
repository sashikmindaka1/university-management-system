package com.example.universityManagement.repository;

import com.example.universityManagement.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDate;


public interface AttendanceRepository 
extends JpaRepository<Attendance, Long> {


    List<Attendance> findByDate(LocalDate date);


    List<Attendance> findByStudentId(Long studentId);


}