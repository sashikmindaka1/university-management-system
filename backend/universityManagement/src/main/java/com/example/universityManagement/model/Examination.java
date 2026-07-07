package com.example.universityManagement.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "examinations")
@Data
public class Examination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String examCode;
    private String marks;
    private String grade;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
}