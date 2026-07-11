package com.example.universityManagement.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "lecturers")
@Data
public class Lecturer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String lecturerId;

    private String name;
    private String department;
    private String email;
    private String specialization;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User userAccount;
}