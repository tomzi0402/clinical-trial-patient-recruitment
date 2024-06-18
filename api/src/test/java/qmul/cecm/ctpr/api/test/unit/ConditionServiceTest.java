package qmul.cecm.ctpr.api.test.unit;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import qmul.cecm.ctpr.api.model.Condition;
import qmul.cecm.ctpr.api.repository.ConditionRepository;
import qmul.cecm.ctpr.api.service.ConditionService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

public class ConditionServiceTest {

    @Mock
    private ConditionRepository conditionRepo;

    @InjectMocks
    private ConditionService conditionService;

    private List<Condition> mockConditions;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockConditions = List.of(
                new Condition(1L, "Hypertension"),
                new Condition(2L, "Diabetes"),
                new Condition(3L, "Asthma"),
                new Condition(4L, "Migraine")
        );
    }

    @Test
    public void testGetAllConditions() {
        given(conditionRepo.findAll()).willReturn(mockConditions);
        List<Condition> foundConditions = conditionService.getAllConditions();
        assertEquals(mockConditions.size(), foundConditions.size());
        assertEquals(mockConditions, foundConditions);
    }
}
