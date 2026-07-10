package com.example.universityManagement.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


@Entity
@Table(name="courses")
@Data
public class Course {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique = true, nullable = false)
    private String courseCode;


    private String courseName;


    private int credits;



    @OneToMany(mappedBy="course", cascade=CascadeType.ALL)
    @JsonIgnore
    private List<Enrollment> enrollments;


}