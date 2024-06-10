import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/App.css';

import StudyTable from './StudyTable.js'

const StudyList = ({ apiEndPt }) => {
	console.log('render StudyList()');

	const [studyList, setStudyList] = React.useState({ data: []});

	const fetchStudyList = async () => {
		try {
			const result = await axios.get(`${apiEndPt}/study`);
			console.log(result.data);
			setStudyList({ data: result.data});
		}
		catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		fetchStudyList();
	}, []);	

	return (
		<div>
			<NewStudyButton/>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<PatientListButton/>
			<StudyTable list={studyList}/>
		</div>
	);
}

const NewStudyButton = () => {
	let navigate = useNavigate();
	const handleGoToNewStudy = () => {
		navigate('/newStudy');
	}

	return (
		<>
			<button className='button' onClick={handleGoToNewStudy}>Add New Study</button>
		</>
	);	
}

const PatientListButton = () => {
	let navigate = useNavigate();
	const handleGoToPatientList = () => {
		navigate('/patient');
	}

	return (
		<>
			<button className='button' onClick={handleGoToPatientList}>Patient List</button>
		</>
	);	
}

export default StudyList