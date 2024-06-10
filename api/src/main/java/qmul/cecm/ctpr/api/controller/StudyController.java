package qmul.cecm.ctpr.api.controller;

import org.apache.coyote.Response;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import qmul.cecm.ctpr.api.model.Status;
import qmul.cecm.ctpr.api.model.Study;
import qmul.cecm.ctpr.api.service.StudyService;

import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/study")
public class StudyController {

    private static final Logger LOG = LogManager.getLogger(StudyController.class);

    @Autowired
    StudyService studyService;

    @GetMapping()
    public ResponseEntity<List<Study>> getAllStudies() {
        return ResponseEntity.ok(studyService.getAllStudies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Study> getStudyById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(studyService.getStudyById(id));
        } catch (NoSuchElementException e) {
            LOG.warn(e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            LOG.error(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/allowRecruiting")
    public ResponseEntity<List<Study>> getAllowRecruitingStudies() {
        return ResponseEntity.ok(studyService.getAllowRecruitingStudies());
    }

    @PostMapping
    public ResponseEntity<Study> createStudy(@RequestBody Study study) {
        try {
            Study savedStudy = studyService.createStudy(study);
            return ResponseEntity.created(URI.create(String.format("/api/study/%s", savedStudy.getId()))).body(savedStudy);
        } catch (Exception e) {
            LOG.error(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    public ResponseEntity<Study> updateStudy(@RequestBody Study study) {
        try {
            return ResponseEntity.ok(studyService.updateStudy(study));
        } catch (NoSuchElementException e) {
            LOG.warn(e);
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            LOG.error(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping("/status/{id}")
    public ResponseEntity<Study> updateStatus(@PathVariable Long id, @RequestBody Status status) {
        try {
            return ResponseEntity.ok(studyService.updateStatus(id, status));
        } catch (NoSuchElementException e) {
            LOG.warn(e);
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            LOG.error(e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
