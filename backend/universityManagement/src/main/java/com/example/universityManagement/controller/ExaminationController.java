package com.example.universityManagement.controller;


import com.example.universityManagement.model.Examination;
import com.example.universityManagement.service.ExaminationService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController
@RequestMapping("/api/exams")
public class ExaminationController {



    @Autowired
    private ExaminationService examinationService;




    @GetMapping
    public List<Examination> getAllResults(){


        return examinationService.getAllResults();


    }




    @PostMapping("/add-result")
    public Examination addResult(
            @RequestBody Examination examination
    ){


        return examinationService.saveResult(examination);


    }






    @PutMapping("/{id}")
    public Examination updateResult(

            @PathVariable Long id,

            @RequestBody Examination examination

    ){


        return examinationService.updateResult(id, examination);


    }







    @GetMapping("/student/{studentId}")
    public List<Examination> getResultsByStudent(

            @PathVariable Long studentId

    ){


        return examinationService.getResultsByStudent(studentId);


    }



}