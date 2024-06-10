import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from './component/Select.js';
import BackToPreviousPage from './component/BackToPreviousPage.js';

import './style/App.css';

const EditStudy = ({ apiEndPt }) => {
	console.log('render EditStudy()');

	const { studyId } = useParams();

	const [studyState, setStudyState] = React.useState({ id: "", title: "", therapeutics: "", description: "", status: { id : ""} });
    const [statusList, setStatusList] = React.useState({data: []});
	const [isLoading, setIsLoading] = React.useState({loadingStudy: true, loadingStatus: true});
	const [errors, setErrors] = React.useState({title: "",	therapeutics: "", status: ""});

	const validate = () => {
		const newErrors = {};
		if (!studyState.title) {
		  newErrors.title = 'Title is required';
		}
		if (!studyState.therapeutics) {
		  newErrors.therapeutics = 'Therapeutics is required';
		}
		if (!studyState.status.id) {
			newErrors.status = 'Status is required';
		}			
		return newErrors;
	};

    const fetchStatusList = async() => {
		try {
			const result = await axios.get(`${apiEndPt}/status`);
			console.log(result.data);
			setStatusList({ data: result.data});
		}
		catch (error) {
			console.log(error);
		}
		finally {
			setIsLoading((prevState) => ({...prevState, loadingStudy: false}));
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
		finally {
			setIsLoading((prevState) => ({...prevState, loadingStatus: false}));
		}		
	};	

	const handleChangeValue = (event) => {
		console.log(event.target.id);
        console.log(studyState);
		const val = event.target.value;
		switch (event.target.id) {
			case "title":
				return setStudyState((prevState) => ({...prevState, title: val}));
			case "therapeutics":
				return setStudyState((prevState) => ({...prevState, therapeutics: val}));
			case "description":
				return setStudyState((prevState) => ({...prevState, description: val}));
			case "status":
				return setStudyState((prevState) => ({ ...prevState, status: { ...prevState.status, id: val}}));
		}
	}

	const SaveStudyButton = ({ apiEndPt, studyState }) => {
		let navigate = useNavigate();
	
		const handleSaveStudy = async () => {
			console.log('handleSaveStudy');

			const validationErrors = validate();
			if (Object.keys(validationErrors).length > 0) {
			  	setErrors(validationErrors);
			} 
			else {
			  	setErrors({});
				try {
					const result = await axios.put(`${apiEndPt}/study`, studyState);
					navigate(-1)
				}
				catch (error) {
					console.log(error);
				}				
			}			
		};
	
		return (
			<>
				<button className='button' type="button" onClick={() => { handleSaveStudy() }}>Save</button>
			</>
		);
	};	

    React.useEffect(() => {
        fetchStatusList();
		fetchStudy();
    }, []);

	if (isLoading.loadingStudy || isLoading.loadingStatus) {
		return <div>Loading...</div>;
	}			

	return (
		<div className='editForm'>
			<label htmlFor="studyId">Study ID:</label>
			<input id="studyId" type="text" value={studyState.id} readOnly></input>
			<br/>
			<label htmlFor="title">Title:<span style={{ color: 'red' }}>*</span></label>
			<input id="title" type="text" value={studyState.title} onChange={handleChangeValue} required></input>
			{errors.title && <p className="error">{errors.title}</p>}
			<br />
			<label htmlFor="therapeutics">Therapeutics:<span style={{ color: 'red' }}>*</span></label>
			<input id="therapeutics" type="text" value={studyState.therapeutics} onChange={handleChangeValue} required></input>
			{errors.title && <p className="error">{errors.title}</p>}
			<br />
			<label htmlFor="description">Description:</label>
			<input id="description" type="text" value={studyState.description} onChange={handleChangeValue}></input>
			<br />
			<label htmlFor="status">Status:<span style={{ color: 'red' }}>*</span></label>
            <Select id="status" list={statusList} onChangeHandler={handleChangeValue} selectedId={studyState.status.id}/>
			{errors.status && <p className="error">{errors.status}</p>}
			<br />
			<SaveStudyButton apiEndPt={apiEndPt} studyState={studyState}/>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<BackToPreviousPage />
		</div>
	)
};



export default EditStudy;
