package qmul.cecm.ctpr.api.controller;

import org.apache.coyote.Response;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import qmul.cecm.ctpr.api.model.Patient;
import qmul.cecm.ctpr.api.service.PatientService;

import java.net.URI;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/patient")
public class PatientController {

    private static final Logger LOG = LogManager.getLogger(PatientController.class);

    @Autowired
    PatientService patientService;

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(patientService.getPatientById(id));
        } catch (NoSuchElementException e) {
            LOG.warn(e);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            LOG.error(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        try {
            Patient savedPatient = patientService.createPatient(patient);
            return ResponseEntity.created(URI.create(String.format("/api/patient/%s", savedPatient.getId()))).body(savedPatient);
        } catch (Exception e) {
            LOG.error(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping
    public ResponseEntity<Patient> updatePatient(@RequestBody Patient patient) {
        try {
            return ResponseEntity.ok(patientService.updatePatient(patient));
        } catch (NoSuchElementException e) {
            LOG.warn(e);
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            LOG.error(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletePatient(@PathVariable Long id) {
        try {
            patientService.deletePatient(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            LOG.warn(e);
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            LOG.error(e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
