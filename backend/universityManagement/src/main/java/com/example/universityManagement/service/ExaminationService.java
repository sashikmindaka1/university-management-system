package com.example.universityManagement.service;

import com.example.universityManagement.model.Examination;
import com.example.universityManagement.repository.ExaminationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExaminationService {

    @Autowired
    private ExaminationRepository examinationRepository;

    public List<Examination> getAllResults() {
        return examinationRepository.findAll();
    }

    public Examination saveResult(Examination examination) {
        return examinationRepository.save(examination);
    }

    public List<Examination> getResultsByStudent(Long studentId) {
        return examinationRepository.findByStudentId(studentId);
    }
}