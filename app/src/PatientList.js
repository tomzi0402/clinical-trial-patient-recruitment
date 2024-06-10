import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import PatientTable from './PatientTable.js'

const PatientList = ({ apiEndPt }) => {
	console.log('render PatientList()');

	const [patientList, setPatientList] = React.useState({ data: []});

	const fetchPatientList = async () => {
		try {
			const result = await axios.get(`${apiEndPt}/patient`);
			// console.log(result.data);
			setPatientList({ data: result.data});
		}
		catch (error) {
			console.log(error);
		}
	};

	const handleDeletePatient = async (id) => {
		console.log("handleDeletePatient=" + id);
		try {
			const result = await axios.delete(`${apiEndPt}/patient/${id}`);
			fetchPatientList();
		}
		catch (error) {
			console.log(error);
		}
	};	

	React.useEffect(() => {
		fetchPatientList();
	}, []);	

	return (
		<div>
			<StudyListButton/>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<NewPatientButton/>
			<PatientTable list={patientList} onDeletePatient={handleDeletePatient} />
		</div>
	);
}

const StudyListButton = () => {
	let navigate = useNavigate();
	const handleGoToStudyList = () => {
		navigate('/study');
	}

	return (
		<>
			<button className='button' onClick={handleGoToStudyList}>Study List</button>
		</>
	);	
}

const NewPatientButton = () => {
	let navigate = useNavigate();
	const handleGoToNewPatient = () => {
		navigate('/newPatient');
	}

	return (
		<>
			<button className='button' onClick={handleGoToNewPatient}>Add New Patient</button>
		</>
	);	
}

export default PatientList
