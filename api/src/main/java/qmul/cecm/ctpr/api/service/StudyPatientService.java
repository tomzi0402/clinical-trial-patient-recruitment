package qmul.cecm.ctpr.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import qmul.cecm.ctpr.api.model.StudyPatient;
import qmul.cecm.ctpr.api.repository.StudyPatientRepository;

import java.util.List;

@Service
public class StudyPatientService {

    @Autowired
    StudyPatientRepository studyPatientRepo;


    public List<StudyPatient> findAll() {
        return studyPatientRepo.findAll(Sort.by(Sort.Order.desc("recruitmentDate")));
    }

    public StudyPatient getStudyPatientById(Long id) {
        return studyPatientRepo.findById(id).orElseThrow();
    }

    public StudyPatient createStudyPatient(StudyPatient studyPatient) {
        return studyPatientRepo.save(studyPatient);
    }
}
