package com.example.universityManagement.controller;


import com.example.universityManagement.model.User;
import com.example.universityManagement.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @Autowired
    private AuthService authService;



    @PostMapping("/login")
    public User login(@RequestBody User user){


        return authService.login(
                user.getUsername(),
                user.getPassword()
        );

    }


}