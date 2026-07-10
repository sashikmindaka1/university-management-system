package com.example.universityManagement.model;


import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


@Entity
@Table(name="students")
@Data
public class Student {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique=true, nullable=false)
    private String studentId;


    @Column(nullable=false)
    private String name;


    private String major;


    private String batch;


    private String status;



    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="user_id")
    private User userAccount;



    @OneToMany(mappedBy="student", cascade=CascadeType.ALL)
    @JsonIgnore
    private List<Enrollment> enrollments;


}