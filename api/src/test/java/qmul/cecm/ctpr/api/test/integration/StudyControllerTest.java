package qmul.cecm.ctpr.api.test.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class StudyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetAllStudies() throws Exception {
        mockMvc.perform(get("/api/study")).andExpect(status().isOk()).andExpect(content().contentType("application/json")).andExpect(jsonPath("$[0].therapeutics").value("Computer Science"));
    }

    @Test
    public void testGetStudyById() throws Exception {
        // TODO
//        mockMvc.perform(get("/api/study")).andExpect(status().isOk()).andExpect(content().contentType("application/json")).andExpect(jsonPath("$[0].therapeutics").value("Computer Science"));
    }

    @Test
    public void testCreateStudy() throws Exception {
        // TODO
//        mockMvc.perform(get("/api/study")).andExpect(status().isOk()).andExpect(content().contentType("application/json")).andExpect(jsonPath("$[0].therapeutics").value("Computer Science"));
    }

    @Test
    public void testUpdateStudy() throws Exception {
        // TODO
//        mockMvc.perform(get("/api/study")).andExpect(status().isOk()).andExpect(content().contentType("application/json")).andExpect(jsonPath("$[0].therapeutics").value("Computer Science"));
    }

    @Test
    public void testUpdateStatus() throws Exception {
        // TODO
//        mockMvc.perform(get("/api/study")).andExpect(status().isOk()).andExpect(content().contentType("application/json")).andExpect(jsonPath("$[0].therapeutics").value("Computer Science"));
    }
}
