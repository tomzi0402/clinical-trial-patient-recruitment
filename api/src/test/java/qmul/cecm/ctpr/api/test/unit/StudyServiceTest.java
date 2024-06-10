package qmul.cecm.ctpr.api.test.unit;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;
import qmul.cecm.ctpr.api.model.Status;
import qmul.cecm.ctpr.api.model.Study;
import qmul.cecm.ctpr.api.repository.StudyRepository;
import qmul.cecm.ctpr.api.service.StudyService;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

public class StudyServiceTest {

    @Mock
    private StudyRepository studyRepo;

    @InjectMocks
    private StudyService studyService;

    private List<Study> mockStudies;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockStudies = List.of(
                new Study(1L, "Effects of Sleep on Cognitive Performance", "Neuroscience", "Investigates how sleep duration impacts cognitive abilities", new Status(1L, "Recruiting", true)),
                new Study(2L, "Climate Change and Coastal Erosion", "Environmental Science", "Examines the relationship between climate change and coastal erosion rates", new Status(2L, "Completed", false)),
                new Study(3L, "AI in Medical Diagnosis", "Computer Science", "Evaluates the effectiveness of AI in diagnosing medical conditions", new Status(3L, "Withdrawn", false)),
                new Study(4L, "Nutritional Impact on Adolescent Growth", "Nutrition", "Studies the effects of different diets on adolescent physical", new Status(4L, "Terminated", false)),
                new Study(5L, "Renewable Energy Adoption in Urban Areas", "Energy Studies", "Analyses factors influencing the adoption of renewable energy in cities", new Status(5L, "Planning", false)));
    }

    @Test
    public void testGetAllStudies() {
        given(studyRepo.findAll(Sort.by(Sort.Order.asc("id")))).willReturn(mockStudies);
        List<Study> foundStudies = studyService.getAllStudies();
        assertEquals(mockStudies.size(), foundStudies.size());
        assertEquals(mockStudies, foundStudies);
    }

    @Test
    public void testGetStudyById() {
        given(studyRepo.findById(mockStudies.getFirst().getId())).willReturn(Optional.of(mockStudies.getFirst()));
        Study foundStudy = studyService.getStudyById(mockStudies.getFirst().getId());
        assertEquals(mockStudies.getFirst(), foundStudy);
    }

    @Test
    public void testCreateStudy() {
        given(studyRepo.save(any(Study.class))).willReturn(mockStudies.getLast());
        Study createdStudy = studyService.createStudy(mockStudies.getLast());
        assertEquals(mockStudies.getLast(), createdStudy);
    }

    @Test
    public void testUpdateStudy() {
        Study firstStudy = mockStudies.getFirst();
        Study updatedStudy = new Study(firstStudy.getId(), firstStudy.getTitle(), "Environmental Science", firstStudy.getDescription(), firstStudy.getStatus());
        given(studyRepo.existsById(firstStudy.getId())).willReturn(true);
        given(studyRepo.save(any(Study.class))).willReturn(updatedStudy);

        Study result = studyService.updateStudy(updatedStudy);
        assertEquals(updatedStudy.getTherapeutics(), result.getTherapeutics());
    }

    @Test
    public void testUpdateStatus() {
        Study firstStudy = mockStudies.getFirst();
        Status newStatus = mockStudies.getLast().getStatus();
        Study updatedStudy = new Study(firstStudy.getId(), firstStudy.getTitle(), firstStudy.getTherapeutics(), firstStudy.getDescription(), newStatus);

        given(studyRepo.findById(firstStudy.getId())).willReturn(Optional.of(firstStudy));
        given(studyRepo.save(any(Study.class))).willReturn(updatedStudy);

        Study result = studyService.updateStatus(firstStudy.getId(), newStatus);
        assertEquals(updatedStudy.getStatus(), result.getStatus());
    }
}
