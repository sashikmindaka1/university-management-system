package com.example.universityManagement.service;

import com.example.universityManagement.model.User;
import com.example.universityManagement.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AuthService {


    @Autowired
    private UserRepository userRepository;



    public User login(String username, String password){


        User user = userRepository.findByUsername(username)
                .orElseThrow(
                    () -> new RuntimeException("User not found")
                );



        if(!user.getPassword().equals(password)){

            throw new RuntimeException("Wrong password");

        }



        return user;

    }


}