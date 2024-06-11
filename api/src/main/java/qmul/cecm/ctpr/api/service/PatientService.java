package qmul.cecm.ctpr.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import qmul.cecm.ctpr.api.model.Patient;
import qmul.cecm.ctpr.api.repository.PatientRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PatientService {

    @Autowired
    PatientRepository patientRepo;

    public List<Patient> getAllPatients() {
        return patientRepo.findAll(Sort.by(Sort.Order.desc("recruitmentDate")));
    }

    public Patient getPatientById(Long id) {
        return patientRepo.findById(id).orElseThrow();
    }

    public Patient createPatient(Patient patient) {
        return patientRepo.save(patient);
    }

    public Patient updatePatient(Patient patient) {
        if (!patientRepo.existsById(patient.getId())) {
            throw new NoSuchElementException(patient.toString());
        }
        return patientRepo.save(patient);
    }

    public void deletePatient(Long id) {
        if (!patientRepo.existsById(id)) {
            throw new NoSuchElementException(id.toString());
        }
        patientRepo.deleteById(id);
    }
}

