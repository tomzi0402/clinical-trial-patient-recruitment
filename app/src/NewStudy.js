import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from './component/Select.js';
import BackToPreviousPage from './component/BackToPreviousPage.js';

import './style/App.css';

const NewStudy = ({ apiEndPt }) => {
	console.log('render NewStudy()');

	const [studyState, setStudyState] = React.useState({ title: "", therapeutics: "", description: "", status: {id : ""}});
    const [statusList, setStatusList] = React.useState({data: []});
	const [isLoading, setIsLoading] = React.useState(true);

    const fetchStatusList = async() => {
		try {
			const result = await axios.get(`${apiEndPt}/status`);
			console.log(result.data);
			setStatusList({ data: result.data});
			setStudyState((prevState) => ({ ...prevState, status: { ...prevState.status, id: result.data[0].id}}));
		}
		catch (error) {
			console.log(error);
		}
		finally {
			setIsLoading(false);
		}
    };

	const handleChangeValue = (event) => {
		console.log(event.target.id);
        console.log(studyState);
		const val = event.target.value;
		switch (event.target.id) {
			case "title":
				return setStudyState((prevState) => ({ ...prevState, title: val }));
			case "therapeutics":
				return setStudyState((prevState) => ({ ...prevState, therapeutics: val }));
			case "description":
				return setStudyState((prevState) => ({ ...prevState, description: val }));
			case "status":
				return setStudyState((prevState) => ({ ...prevState, status: { ...prevState.status, id: val}}));
		}
	}

    React.useEffect(() => {
        fetchStatusList();
    }, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}		

	return (
		<div className='editForm'>
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
            <Select id="status" list={statusList} onChangeHandler={handleChangeValue}/>
			<br />
			<CreateStudyButton apiEndPt={apiEndPt} studyState={studyState} />
			&nbsp;&nbsp;&nbsp;&nbsp;
			<BackToPreviousPage />
		</div>
	)
};

const CreateStudyButton = ({ apiEndPt, studyState }) => {
	let navigate = useNavigate();

	const handleCreateStudy = async () => {
		console.log('handleCreateStudy');
		try {
			const result = await axios.post(`${apiEndPt}/study`, studyState);
			navigate(-1)
		}
		catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<button className='button' type="button" onClick={() => { handleCreateStudy() }}>Create</button>
		</>
	);
};

export default NewStudy;
