package com.example.universityManagement.repository;

import com.example.universityManagement.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByDate(java.time.LocalDate date);

    List<Attendance> findByStudentId(Long studentId);
}