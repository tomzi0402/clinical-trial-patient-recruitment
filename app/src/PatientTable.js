import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/App.css';

const PatientTable = ({ list, onDeletePatient }) => {
	console.log('render PatientTable');

	return (
		<ul>
			<li>
				<span style={{ width: '5%', fontWeight: 'bold' }} >Patient ID</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Full Name</span>
				<span style={{ width: '5%', fontWeight: 'bold' }} >Age</span>
				<span style={{ width: '5%', fontWeight: 'bold' }} >Gender</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Condition</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Recruitment Date</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Study Title</span>
				<span style={{ width: '15%', fontWeight: 'bold' }} >Therapeutics</span>
				<span style={{ width: '15%', fontWeight: 'bold' }} >Description</span>
				<span style={{ width: '5%', fontWeight: 'bold' }} >Status</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Action</span>
			</li>

			{
				list.data.map((item) => {
					return (
						<li key={item.id}>
							<span style={{ width: '5%' }} >{item.id}</span>
							<span style={{ width: '10%' }} >{item.fullName}</span>
							<span style={{ width: '5%' }} >{item.age}</span>
							<span style={{ width: '5%' }} >{item.gender.name}</span>
							<span style={{ width: '10%' }} >{item.condition.name}</span>
							<span style={{ width: '10%' }} >{item.recruitmentDate}</span>
							<span style={{ width: '10%' }} >{item.study.title}</span>
							<span style={{ width: '15%' }} >{item.study.therapeutics}</span>
							<span style={{ width: '15%' }} >{item.study.description}</span>
							<span style={{ width: '5%' }} >{item.study.status.name}</span>
							<span style={{ width: '10%' }} >
								<EditPatientButton patientId={item.id}/>							
								&nbsp;&nbsp;&nbsp;&nbsp;
								<button className='button' type="button" onClick={() => { onDeletePatient(item.id, item.fullName) }}>
									Delete
								</button>
							</span>
						</li>
					);
				})
			}
		</ul >
	)
};

const EditPatientButton = ({ patientId }) => {
	let navigate = useNavigate();
	const handleGoToEditPatient = () => {
		navigate('/editPatient/' + patientId);
	}

	return (
		<>
			<button className='button' onClick={handleGoToEditPatient}>Edit</button>
		</>
	);	
}

export default React.memo(PatientTable);
