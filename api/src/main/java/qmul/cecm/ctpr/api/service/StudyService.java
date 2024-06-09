package qmul.cecm.ctpr.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import qmul.cecm.ctpr.api.model.Status;
import qmul.cecm.ctpr.api.model.Study;
import qmul.cecm.ctpr.api.repository.StudyRepository;

import java.util.List;

@Service
public class StudyService {

    @Autowired
    StudyRepository studyRepo;

    public List<Study> getAllStudies() {
        return studyRepo.findAll(Sort.by(Sort.Order.asc("therapeutics")));
    }

    public Study getStudyById(Long id) {
        return studyRepo.findById(id).orElseThrow();
    }

    public Study createStudy(Study study) {
        return studyRepo.save(study);
    }

    public Study updateStudy(Long id, Study study) {
        Study oldStudy = studyRepo.findById(id).orElseThrow();
        oldStudy.setTitle(study.getTitle());
        oldStudy.setTherapeutics(study.getTherapeutics());
        oldStudy.setDescription(study.getDescription());
        oldStudy.setStatus(study.getStatus());
        return studyRepo.save(oldStudy);
    }

    public Study updateStatus(Long id, Status status) {
        Study oldStudy = studyRepo.findById(id).orElseThrow();
        oldStudy.setStatus(status);
        return studyRepo.save(oldStudy);
    }

}
