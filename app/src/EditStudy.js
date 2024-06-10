import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from './Select';
import BackToPreviousPage from './BackToPreviousPage';

import './App.css';

const EditStudy = ({ apiEndPt }) => {
	console.log('render EditStudy()');

	const { studyId } = useParams();

	const [studyState, setStudyState] = React.useState({ id: "", title: "", therapeutics: "", description: "", status: { id : ""} });
    const [statusList, setStatusList] = React.useState({data: []});

    const fetchStatusList = async() => {
		try {
			const result = await axios.get(`${apiEndPt}/status`);
			console.log(result.data);
			setStatusList({ data: result.data});
		}
		catch (error) {
			console.log(error);
		}
    };

	const fetchStudy = async () => {
		try {
			const result = await axios.get(`${apiEndPt}/study/${studyId}`);
			console.log(result.data);
			setStudyState(result.data);
		}
		catch (error) {
			console.log(error);
		}
	};	

	const handleChangeValue = (event) => {
		console.log(event.target.id);
        console.log(studyState);
		const val = event.target.value;
		switch (event.target.id) {
			case "title":
				return setStudyState({ ...studyState, title: val });
			case "therapeutics":
				return setStudyState({ ...studyState, therapeutics: val });
			case "description":
				return setStudyState({ ...studyState, description: val });
			case "status":
				return setStudyState({ ...studyState, status: { ...studyState.status, id: val}});
		}
	}

	React.useEffect(() => {
        fetchStudy();
    }, []);

    React.useEffect(() => {
        fetchStatusList();
    }, []);

	return (
		<div className='editForm'>
			<label htmlFor="studyId">Study ID:</label>
			<input id="studyId" type="text" value={studyState.id} readOnly></input>
			<br/>
			<label htmlFor="title">Title:</label>
			<input id="title" type="text" value={studyState.title} onChange={handleChangeValue}></input>
			<br />
			<label htmlFor="therapeutics">Therapeutics:</label>
			<input id="therapeutics" type="text" value={studyState.therapeutics} onChange={handleChangeValue}></input>
			<br />
			<label htmlFor="description">Description:</label>
			<input id="description" type="text" value={studyState.description} onChange={handleChangeValue}></input>
			<br />
			<label htmlFor="status">Status:</label>
            <Select list={statusList} onChangeHandler={handleChangeValue} selectedStatus={studyState.status}/>
			<br />
			<SaveStudyButton apiEndPt={apiEndPt} studyState={studyState}/>
			&nbsp;
			<BackToPreviousPage />
		</div>
	)
};

const SaveStudyButton = ({ apiEndPt, studyState }) => {
	let navigate = useNavigate();

	const handleSaveStudy = async () => {
		console.log('handleSaveStudy');
		try {
			const result = await axios.put(`${apiEndPt}/study`, studyState);
			navigate(-1)
		}
		catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<button className='button' type="button" onClick={() => { handleSaveStudy() }}>Save</button>
		</>
	);
};

export default EditStudy;
