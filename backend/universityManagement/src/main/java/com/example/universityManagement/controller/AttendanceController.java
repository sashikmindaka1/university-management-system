package com.example.universityManagement.controller;


import com.example.universityManagement.model.Attendance;
import com.example.universityManagement.service.AttendanceService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.util.List;



@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins="http://localhost:5173")
public class AttendanceController {



    @Autowired
    private AttendanceService attendanceService;






    @GetMapping
    public List<Attendance> getAll(){

        return attendanceService.getAllAttendance();

    }







    @PostMapping
    public Attendance save(
            @RequestBody Attendance attendance
    ){

        return attendanceService.saveAttendance(attendance);

    }







    @GetMapping("/date/{date}")
    public List<Attendance> getByDate(
            @PathVariable String date
    ){

        return attendanceService.getAttendanceByDate(
                LocalDate.parse(date)
        );

    }






    @GetMapping("/student/{id}")
    public List<Attendance> getStudentAttendance(
            @PathVariable Long id
    ){

        return attendanceService.getStudentAttendance(id);

    }



}