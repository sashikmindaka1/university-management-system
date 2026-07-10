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




    // Get all attendance

    public List<Attendance> getAllAttendance(){

        return attendanceRepository.findAll();

    }





    // Save attendance

    public Attendance saveAttendance(Attendance attendance){

        return attendanceRepository.save(attendance);

    }





    // Get attendance by date

    public List<Attendance> getAttendanceByDate(LocalDate date){

        return attendanceRepository.findByDate(date);

    }





    // Get student attendance

    public List<Attendance> getStudentAttendance(Long studentId){

        return attendanceRepository.findByStudentId(studentId);

    }



}