package qmul.cecm.ctpr.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import qmul.cecm.ctpr.api.model.Condition;
import qmul.cecm.ctpr.api.repository.ConditionRepository;

import java.util.List;

@Service
public class ConditionService {

    @Autowired
    ConditionRepository conditionRepo;

    public List<Condition> getAllConditions() {
        return conditionRepo.findAll();
    }
}
