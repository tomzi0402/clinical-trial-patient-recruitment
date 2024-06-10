package qmul.cecm.ctpr.api.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import qmul.cecm.ctpr.api.model.Condition;
import qmul.cecm.ctpr.api.service.ConditionService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/condition")
public class ConditionController {

    private static final Logger LOG = LogManager.getLogger(ConditionController.class);

    @Autowired
    ConditionService conditionService;

    @GetMapping
    public ResponseEntity<List<Condition>> getAllConditions() {
        return ResponseEntity.ok(conditionService.getAllConditions());
    }
}
