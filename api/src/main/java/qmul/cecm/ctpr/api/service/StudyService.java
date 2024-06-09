package qmul.cecm.ctpr.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mapping.model.Property;
import org.springframework.stereotype.Service;
import qmul.cecm.ctpr.api.model.Status;
import qmul.cecm.ctpr.api.model.Study;
import qmul.cecm.ctpr.api.repository.StudyRepository;

import java.util.List;
import java.util.NoSuchElementException;

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

    public Study updateStudy(Study study) {
        if (!studyRepo.existsById(study.getId())) {
            throw new NoSuchElementException(study.toString());
        }
        return studyRepo.save(study);
    }

    public Study updateStatus(Long id, Status status) {
        Study oldStudy = studyRepo.findById(id).orElseThrow();
        oldStudy.setStatus(status);
        return studyRepo.save(oldStudy);
    }

}
