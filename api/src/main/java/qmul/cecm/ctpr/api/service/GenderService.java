package qmul.cecm.ctpr.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import qmul.cecm.ctpr.api.model.Gender;
import qmul.cecm.ctpr.api.repository.GenderRepository;

import java.util.List;

@Service
public class GenderService {

    @Autowired
    GenderRepository genderRepo;

    public List<Gender> getAllGenders() {
        return genderRepo.findAll();
    }
}
