import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/App.css';

const StudyTable = ({ list }) => {
	// console.log('render StudyTable');

	return (
		<ul>
			<li>
				<span style={{ width: '5%'}} >Study ID</span>
				<span style={{ width: '20%'}} >Title</span>
				<span style={{ width: '10%'}} >Therapeutics</span>
				<span style={{ width: '45%'}} >Description</span>
				<span style={{ width: '10%'}} >Status</span>
				<span style={{ width: '10%'}} >Action</span>
			</li>

			{
				list.data.map((item) => {
					return (
						<li key={item.id}>
							<span style={{ width: '5%' }} >{item.id}</span>
							<span style={{ width: '20%' }} >{item.title}</span>
							<span style={{ width: '10%' }} >{item.therapeutics}</span>
							<span style={{ width: '45%' }} >{item.description}</span>
							<span style={{ width: '10%' }} >{item.status.name}</span>
							<span style={{ width: '10%' }} >
								<EditStudyButton studyId={item.id}/>						
							</span>
						</li>
					);
				})
			}
		</ul >
	)
};

const EditStudyButton = ({ studyId }) => {
	let navigate = useNavigate();
	const handleGoToEditStudy = () => {
		navigate('/editStudy/' + studyId);
	}

	return (
		<>
			<button className='button' onClick={handleGoToEditStudy}>Edit</button>
		</>
	);	
}

export default React.memo(StudyTable);
