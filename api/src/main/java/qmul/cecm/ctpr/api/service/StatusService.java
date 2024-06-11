package qmul.cecm.ctpr.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import qmul.cecm.ctpr.api.model.Status;
import qmul.cecm.ctpr.api.repository.StatusRepository;

import java.util.List;

@Service
public class StatusService {

    @Autowired
    StatusRepository statusRepo;

    public List<Status> getAllStatus() {
        return statusRepo.findAll();
    }
}
