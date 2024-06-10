import * as React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const PatientTable = ({ list, onDeletePatient }) => {
	console.log('render PatientTable');

	return (
		<ul>
			<li>
				<span style={{ width: '5%', fontWeight: 'bold' }} >Patient ID</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >First Name</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Last Name</span>
				<span style={{ width: '5%', fontWeight: 'bold' }} >Age</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Gender</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Condition</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Recruitment Date</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Study Title</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Therapeutics</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Description</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Status</span>
				<span style={{ width: '10%', fontWeight: 'bold' }} >Action</span>
			</li>

			{
				list.data.map((item) => {
					return (
						<li key={item.id}>
							{/* <span style={{ width: '5%' }} ><Link to={`/editPatient/${item.id}`}>{item.id}</Link></span> */}
							<span style={{ width: '5%' }} >{item.id}</span>
							<span style={{ width: '10%' }} >{item.firstName}</span>
							<span style={{ width: '10%' }} >{item.lastName}</span>
							<span style={{ width: '5%' }} >{item.age}</span>
							<span style={{ width: '10%' }} >{item.gender.name}</span>
							<span style={{ width: '10%' }} >{item.condition.name}</span>
							<span style={{ width: '10%' }} >{item.recruitmentDate}</span>
							<span style={{ width: '10%' }} >{item.study.title}</span>
							<span style={{ width: '10%' }} >{item.study.therapeutics}</span>
							<span style={{ width: '10%' }} >{item.study.description}</span>
							<span style={{ width: '10%' }} >{item.study.status.name}</span>
							<span style={{ width: '10%' }} >
								{/* <button type="button" onClick={() => { onEditPatient(item.id) }}>
									Edit
								</button>								 */}
								&nbsp;&nbsp;
								<button className='button' type="button" onClick={() => { onDeletePatient(item.id) }}>
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

export default React.memo(PatientTable);
