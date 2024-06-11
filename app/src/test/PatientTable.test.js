import {render, screen} from '@testing-library/react';
import PatientTable from '../PatientTable';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

test("render patient table", () => {
    const onDelete = jest.fn();
    const patientList = { data: [{id:"1",fullName:"Full Name 1",age:"23",gender:{name: "Male"},condition:{name: "Asthma"},recruitmentDate: "2024-06-11", study: {title: "study 1", therapeutics: "thera 1", description: "desc 1", status: {name:"Completed"}}},
        {id:"2",fullName:"Full Name 2",age:"31",gender:{name: "Female"},condition:{name: "Diabetes"},recruitmentDate: "2024-04-11", study: {title: "study 2", therapeutics: "thera 2", description: "desc 2", status: {name:"Terminated"}}}]};
    render(<PatientTable list={patientList} onDeletePatient={onDelete} />);
    const fullName1 = screen.getByText(/Full Name 1/i);
    expect(fullName1).toBeInTheDocument();    
    const condition1 = screen.getByText(/Asthma/i);
    expect(condition1).toBeInTheDocument();    
    const status1 = screen.getByText(/Completed/i);
    expect(status1).toBeInTheDocument();    
    const fullName2 = screen.getByText(/Full Name 2/i);
    expect(fullName2).toBeInTheDocument();    
    const condition2 = screen.getByText(/Diabetes/i);
    expect(condition2).toBeInTheDocument();  

});
