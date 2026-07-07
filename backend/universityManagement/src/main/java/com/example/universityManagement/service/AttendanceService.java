package com.example.universityManagement.service;

import com.example.universityManagement.model.Attendance;
import com.example.universityManagement.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    public Attendance markAttendance(Attendance attendance) {
        if (attendance.getDate() == null) {
            attendance.setDate(LocalDate.now()); // Date එක frontend එකෙන් එවුවේ නැත්නම් current date එක ගන්නවා
        }
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendanceByStudent(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }
}