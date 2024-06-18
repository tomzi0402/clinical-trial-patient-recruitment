package qmul.cecm.ctpr.api.test.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import qmul.cecm.ctpr.api.model.Gender;
import qmul.cecm.ctpr.api.model.Patient;
import qmul.cecm.ctpr.api.model.Status;
import qmul.cecm.ctpr.api.model.Study;
import qmul.cecm.ctpr.api.service.PatientService;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class PatientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    PatientService patientService;

    @Test
    public void testGetAllPatients() throws Exception {
        mockMvc.perform(get("/api/patient"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].firstName").value("Mary"))
                .andExpect(jsonPath("$[0].lastName").value("Johnson"));
    }

    @Test
    public void testGetPatientById() throws Exception {
        mockMvc.perform(get("/api/patient/3"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.firstName").value("Robert"))
                .andExpect(jsonPath("$.lastName").value("Brown"));
    }

    @Test
    public void testCreatePatient() throws Exception {
        Patient newPatient = patientService.getPatientById(1L);
        String newFirstName = "Tommy";
        newPatient.setId(null);
        newPatient.setFirstName(newFirstName);
        mockMvc.perform(post("/api/patient").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(newPatient)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.firstName").value(newFirstName));
    }

    @Test
    public void testUpdatePatient() throws Exception {
        Gender newGender = new Gender(2L, "Female");
        String newFirstName = "Tommy2";
        Patient patient = patientService.getPatientById(1L);
        assertNotEquals(patient.getGender().getId(), newGender.getId());
        assertNotEquals(patient.getFirstName(), newFirstName);
        patient.setFirstName(newFirstName);
        patient.setGender(newGender);
        mockMvc.perform(put("/api/patient").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(patient)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.firstName").value(newFirstName))
                .andExpect(jsonPath("$.gender.id").value(newGender.getId()));
    }

    @Test
    public void testDeletePatient() throws Exception {
        mockMvc.perform(get("/api/patient/1")).andExpect(status().isOk());
        mockMvc.perform(delete("/api/patient/1")).andExpect(status().isNoContent());
        mockMvc.perform(get("/api/patient/1")).andExpect(status().isNotFound());
    }
}
