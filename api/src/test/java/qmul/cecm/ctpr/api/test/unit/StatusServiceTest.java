package qmul.cecm.ctpr.api.test.unit;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import qmul.cecm.ctpr.api.model.Status;
import qmul.cecm.ctpr.api.repository.StatusRepository;
import qmul.cecm.ctpr.api.service.StatusService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

public class StatusServiceTest {

    @Mock
    private StatusRepository statusRepo;

    @InjectMocks
    private StatusService statusService;

    private List<Status> mockStatus;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockStatus = List.of(
                new Status(1L, "Recruiting", true),
                new Status(2L, "Completed", false),
                new Status(3L, "Withdrawn", false),
                new Status(4L, "Terminated", false),
                new Status(5L, "Planning", false)
        );
    }

    @Test
    public void testGetAllStatus() {
        given(statusRepo.findAll()).willReturn(mockStatus);
        List<Status> foundStatus = statusService.getAllStatus();
        assertEquals(mockStatus.size(), foundStatus.size());
        assertEquals(mockStatus, foundStatus);
    }
}
