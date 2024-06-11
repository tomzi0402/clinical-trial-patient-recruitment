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
public class StatusControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetAllStatus() throws Exception {
        mockMvc.perform(get("/api/status")).andExpect(status().isOk()).andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$[0].name").value("Recruiting"))
                .andExpect(jsonPath("$[0].allowRecruit").value("true"));
    }

}