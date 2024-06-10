import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from './component/Select.js';
import BackToPreviousPage from './component/BackToPreviousPage.js';
import DatePicker from './component/DatePicker.js';

import './style/App.css';

const EditPatient = ({ apiEndPt }) => {
	console.log('render EditPatient()');

	const { patientId } = useParams();

	const [patientState, setPatientState] = React.useState({ id: "", firstName: "", lastName: "", dob: "", gender: { id : ""}, condition: { id : ""}, study: { id : ""}, recruitmentDate: "" });
    const [genderList, setGenderList] = React.useState({data: []});
    const [conditionList, setConditionList] = React.useState({data: []});
    const [studyList, setStudyList] = React.useState({data: []});
	const [isLoading, setIsLoading] = React.useState({loadingPatient: true, loadingGender: true, loadingCondition: true, loadingStudy: true});

    const fetchGenderList = async() => {
		try {
			const result = await axios.get(`${apiEndPt}/gender`);
			console.log(result.data);
			setGenderList({ data: result.data});
		}
		catch (error) {
			console.log(error);
		}
		finally {
			setIsLoading((prevState) => ({...prevState, loadingGender: false}));
		}
    };

    const fetchConditionList = async() => {
		try {
			const result = await axios.get(`${apiEndPt}/condition`);
			console.log(result.data);
			setConditionList({ data: result.data});
		}
		catch (error) {
			console.log(error);
		}
		finally {
			setIsLoading((prevState) => ({...prevState, loadingCondition: false}));
		}		
    };    

    const fetchStudyList = async() => {
		try {
			const result = await axios.get(`${apiEndPt}/study`);
			console.log(result.data);
			setStudyList({ data: result.data});
		}
		catch (error) {
			console.log(error);
		}
		finally {
			setIsLoading((prevState) => ({...prevState, loadingStudy: false}));
		}		
    };        

	const fetchPatient = async() => {
		try {
			const result = await axios.get(`${apiEndPt}/patient/${patientId}`);
			console.log(result.data);
			setPatientState(result.data);
		}
		catch (error) {
			console.log(error)
		}
		finally {
			setIsLoading((prevState) => ({...prevState, loadingPatient: false}));
		}
	};

	const handleChangeValue = (event) => {
		console.log(event.target.id);
        console.log(patientState);
		const val = event.target.value;
		switch (event.target.id) {
			case "firstName":
				return setPatientState((prevState) => ({ ...prevState, firstName: val }));
			case "lastName":
				return setPatientState((prevState) => ({ ...prevState, lastName: val }));				
			case "dob":
				return setPatientState((prevState) => ({ ...prevState, dob: val }));
			case "gender":
				return setPatientState((prevState) => ({ ...prevState, gender: { ...prevState.gender, id: val}}));
            case "condition":
                return setPatientState((prevState) => ({ ...prevState, condition: { ...prevState.condition, id: val}}));
            case "study":
                return setPatientState((prevState) => ({ ...prevState, study: { ...prevState.study, id: val}}));
            case "recruitmentDate":
				return setPatientState((prevState) => ({ ...prevState, recruitmentDate: val }));
		}
	}

    React.useEffect(() => {
        fetchGenderList();
        fetchConditionList();
        fetchStudyList();         
		fetchPatient();
    }, []);

	if (isLoading.loadingPatient || isLoading.loadingGender || isLoading.loadingCondition || isLoading.loadingStudy) {
		return <div>Loading...</div>;
	}	

	return (
		<div className='editForm'>
			<label htmlFor="patientId">Patient ID:</label>
			<input id="patientId" type="text" value={patientState.id} readOnly></input>
			<br />			
			<label htmlFor="firstName">First Name:</label>
			<input id="firstName" type="text" value={patientState.firstName} onChange={handleChangeValue}></input>
			<br />
			<label htmlFor="lastName">Last Name:</label>
			<input id="lastName" type="text" value={patientState.lastName} onChange={handleChangeValue}></input>
			<br />   
			<label htmlFor="dob">Date of Birth:</label>
            <DatePicker id="dob" onChangedHandler={handleChangeValue} defaultDate={patientState.dob}/>
			<br />                             
			<label htmlFor="gender">Gender:</label>
            <Select id="gender" list={genderList} onChangeHandler={handleChangeValue} selectedId={patientState.gender.id}/>
			<br />
			<label htmlFor="condition">Condition:</label>
            <Select id="condition" list={conditionList} onChangeHandler={handleChangeValue} selectedId={patientState.condition.id}/>
			<br />
			<label htmlFor="study">Study:</label>
            <Select id="study" list={studyList} onChangeHandler={handleChangeValue} selectedId={patientState.study.id}/>
			<br />           
			<label htmlFor="recruitmentDate">Recruitment Date:</label>
            <DatePicker id="recruitmentDate" onChangedHandler={handleChangeValue} defaultDate={patientState.recruitmentDate}/>
			<br />                            
			<SavePatientButton apiEndPt={apiEndPt} patientState={patientState} />
			&nbsp;&nbsp;&nbsp;&nbsp;
			<BackToPreviousPage />
		</div>
	)
};

const SavePatientButton = ({ apiEndPt, patientState }) => {
	let navigate = useNavigate();

	const handleSavePatient = async () => {
		console.log('handleSavePatient');
		try {
			const result = await axios.put(`${apiEndPt}/patient`, patientState);
			navigate(-1)
		}
		catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<button className='button' type="button" onClick={() => { handleSavePatient() }}>Save</button>
		</>
	);
};

export default EditPatient;
