package qmul.cecm.ctpr.api.test.unit;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import qmul.cecm.ctpr.api.model.Gender;
import qmul.cecm.ctpr.api.repository.GenderRepository;
import qmul.cecm.ctpr.api.service.GenderService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

public class GenderServiceTest {

    @Mock
    private GenderRepository genderRepo;

    @InjectMocks
    private GenderService genderService;

    private List<Gender> mockGenders;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockGenders = List.of(
                new Gender(1L, "Male"),
                new Gender(2L, "Female"));
    }

    @Test
    public void testGetAllGenders() {
        given(genderRepo.findAll()).willReturn(mockGenders);
        List<Gender> foundGenders = genderService.getAllGenders();
        assertEquals(mockGenders.size(), foundGenders.size());
        assertEquals(mockGenders, foundGenders);
    }
}
