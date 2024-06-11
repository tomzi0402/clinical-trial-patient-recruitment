package qmul.cecm.ctpr.api.test.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import qmul.cecm.ctpr.api.model.Status;
import qmul.cecm.ctpr.api.model.Study;
import qmul.cecm.ctpr.api.service.StudyService;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class StudyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    StudyService studyService;

    @Test
    public void testGetAllStudies() throws Exception {
        mockMvc.perform(get("/api/study"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].therapeutics").value("Neuroscience"));
    }

    @Test
    public void testGetStudyById() throws Exception {
        mockMvc.perform(get("/api/study/4"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.therapeutics").value("Nutrition"));
    }

    @Test
    public void testCreateStudy() throws Exception {
        Study newStudy = studyService.getStudyById(1L);
        String newTherapeutics = "Testing therapeutics";
        newStudy.setId(null);
        newStudy.setTherapeutics(newTherapeutics);
        mockMvc.perform(post("/api/study").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(newStudy)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.therapeutics").value(newTherapeutics));
    }

    @Test
    public void testUpdateStudy() throws Exception {
        Status newStatus = new Status(1L, "Recruiting", true);
        String newTitle = "Testing Title";
        Study study = studyService.getStudyById(2L);
        assertNotEquals(study.getStatus().getId(), newStatus.getId());
        assertNotEquals(study.getTitle(), newTitle);
        study.setTitle(newTitle);
        study.setStatus(newStatus);
        mockMvc.perform(put("/api/study").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(study)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.title").value(newTitle))
                .andExpect(jsonPath("$.status.id").value(1L));
    }

    @Test
    public void testGetAllowRecruitingStudies() throws Exception {
        mockMvc.perform(get("/api/study/allowRecruiting"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].status.allowRecruit").value(true));
    }
}
