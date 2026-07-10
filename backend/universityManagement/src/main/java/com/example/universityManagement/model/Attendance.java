package com.example.universityManagement.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;


@Entity
@Table(name = "attendance")
@Data
public class Attendance {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private LocalDate date;


    private String status; // PRESENT, ABSENT


    private String tokenUsed; // Dynamic QR features later



    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;


}