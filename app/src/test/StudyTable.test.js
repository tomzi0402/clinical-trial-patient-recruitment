import {render, screen} from '@testing-library/react';
import StudyTable from '../StudyTable';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

test("render study table", () => {
    const studyList = { data: [{id:"1",title:"study 1",therapeutics:"therapeutics 1",description:"description 1",status:{name: "Completed"}},{id:"2",title:"study 2",therapeutics:"therapeutics 2",description:"description 2",status:{name: "Recruiting"}}]};
    render(<StudyTable list={studyList} />);
    const study1 = screen.getByText(/study 1/i);
    expect(study1).toBeInTheDocument();    
    const therapeutics1 = screen.getByText(/therapeutics 1/i);
    expect(therapeutics1).toBeInTheDocument();        
    const status1 = screen.getByText(/Completed/i);
    expect(status1).toBeInTheDocument();        
    const study2 = screen.getByText(/study 2/i);
    expect(study2).toBeInTheDocument();    
    const therapeutics2 = screen.getByText(/therapeutics 2/i);
    expect(therapeutics2).toBeInTheDocument();         
    const status2 = screen.getByText(/Recruiting/i);
    expect(status2).toBeInTheDocument();        

});
