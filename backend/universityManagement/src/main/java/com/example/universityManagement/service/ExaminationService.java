package com.example.universityManagement.service;


import com.example.universityManagement.model.Examination;
import com.example.universityManagement.repository.ExaminationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;



@Service
public class ExaminationService {



    @Autowired
    private ExaminationRepository examinationRepository;




    // Get all exams
    public List<Examination> getAllResults(){

        return examinationRepository.findAll();

    }





    // Add new result OR update existing result
    public Examination saveResult(Examination examination){



        Optional<Examination> existing =

                examinationRepository.findByStudentIdAndCourseId(
                        examination.getStudent().getId(),
                        examination.getCourse().getId()
                );




        if(existing.isPresent()){


            Examination old = existing.get();


            old.setMarks(examination.getMarks());

            old.setGrade(examination.getGrade());

            old.setExamCode(examination.getExamCode());


            return examinationRepository.save(old);


        }




        return examinationRepository.save(examination);



    }







    // Update result by ID
    public Examination updateResult(Long id, Examination data){



        Examination existing =

                examinationRepository.findById(id)

                .orElseThrow(() ->

                    new RuntimeException("Exam result not found")

                );




        existing.setMarks(data.getMarks());

        existing.setGrade(data.getGrade());

        existing.setExamCode(data.getExamCode());



        return examinationRepository.save(existing);


    }








    // Get results by student

    public List<Examination> getResultsByStudent(Long studentId){


        return examinationRepository.findByStudentId(studentId);


    }



}