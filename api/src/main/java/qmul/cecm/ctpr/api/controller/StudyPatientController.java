package qmul.cecm.ctpr.api.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import qmul.cecm.ctpr.api.model.Study;
import qmul.cecm.ctpr.api.model.StudyPatient;
import qmul.cecm.ctpr.api.service.PatientService;
import qmul.cecm.ctpr.api.service.StudyPatientService;

import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/studyPatient")
public class StudyPatientController {

    private static final Logger LOG = LogManager.getLogger(StudyPatientController.class);

    @Autowired
    StudyPatientService studyPatientService;

    @GetMapping
    public ResponseEntity<List<StudyPatient>> getAllStudyPatients() {
        return ResponseEntity.ok(studyPatientService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudyPatient> getStudyById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(studyPatientService.getStudyPatientById(id));
        } catch (NoSuchElementException e) {
            LOG.warn(e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            LOG.error(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<StudyPatient> createStudy(@RequestBody StudyPatient studyPatient) {
        try {
            StudyPatient savedStudyPatient = studyPatientService.createStudyPatient(studyPatient);
            return ResponseEntity.created(URI.create(String.format("/api/studyPatient/%s", savedStudyPatient.getId()))).body(savedStudyPatient);
        } catch (Exception e) {
            LOG.error(e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
