import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from './component/Select.js';
import BackToPreviousPage from './component/BackToPreviousPage.js';
import DatePicker from './component/DatePicker.js';

import './style/App.css';

const NewPatient = ({ apiEndPt }) => {
	console.log('render NewPatient()');

	const [patientState, setPatientState] = React.useState({ firstName: "", lastName: "", dob: "", gender: { id : ""}, condition: { id : ""}, study: { id : ""}, recruitmentDate: "" });
    const [genderList, setGenderList] = React.useState({data: []});
    const [conditionList, setConditionList] = React.useState({data: []});
    const [studyList, setStudyList] = React.useState({data: []});

    const getToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };       

    const fetchGenderList = async() => {
		try {
			const result = await axios.get(`${apiEndPt}/gender`);
			console.log(result.data);
			setGenderList({ data: result.data});
            setPatientState((prevState) => ({...prevState, gender: {...prevState.gender, id: result.data[0].id}}));
		}
		catch (error) {
			console.log(error);
		}
    };

    const fetchConditionList = async() => {
		try {
			const result = await axios.get(`${apiEndPt}/condition`);
			console.log(result.data);
			setConditionList({ data: result.data});
            setPatientState((prevState) => ({...prevState, condition: {...prevState.condition, id: result.data[0].id}}));
		}
		catch (error) {
			console.log(error);
		}
    };    

    const fetchStudyList = async() => {
		try {
			const result = await axios.get(`${apiEndPt}/study`);
			console.log(result.data);
			setStudyList({ data: result.data});
            setPatientState((prevState) => ({...prevState, study: {...prevState.study, id: result.data[0].id}}));
		}
		catch (error) {
			console.log(error);
		}
    };        

	const handleChangeValue = (event) => {
		console.log(event.target.id);
        console.log(patientState);
		const val = event.target.value;
		switch (event.target.id) {
			case "firstName":
				return setPatientState({ ...patientState, firstName: val });
			case "lastName":
				return setPatientState({ ...patientState, lastName: val });
			case "dob":
				return setPatientState({ ...patientState, dob: val });
			case "gender":
				return setPatientState({ ...patientState, gender: { ...patientState.gender, id: val}});
            case "condition":
                return setPatientState({ ...patientState, condition: { ...patientState.condition, id: val}});    
            case "study":
                return setPatientState({ ...patientState, study: { ...patientState.study, id: val}});                               
            case "recruitmentDate":
                return setPatientState({ ...patientState, recruitmentDate: val });
		}
	}

    React.useEffect(() => {
        fetchGenderList();
        fetchConditionList();
        fetchStudyList();        
        var today = getToday();
        setPatientState((prevState) => ({...prevState, recruitmentDate: today}));        
    }, []);

	return (
		<div className='editForm'>
			<label htmlFor="firstName">First Name:</label>
			<input id="firstName" type="text" value={patientState.firstName} onChange={handleChangeValue}></input>
			<br />
			<label htmlFor="lastName">Last Name:</label>
			<input id="lastName" type="text" value={patientState.lastName} onChange={handleChangeValue}></input>
			<br />   
			<label htmlFor="dob">Date of Birth:</label>
            <DatePicker id="dob" onChangedHandler={handleChangeValue}/>
			<br />                             
			<label htmlFor="gender">Gender:</label>
            <Select id="gender" list={genderList} onChangeHandler={handleChangeValue}/>
			<br />
			<label htmlFor="condition">Condition:</label>
            <Select id="condition" list={conditionList} onChangeHandler={handleChangeValue}/>
			<br />
			<label htmlFor="study">Study:</label>
            <Select id="study" list={studyList} onChangeHandler={handleChangeValue}/>
			<br />           
			<label htmlFor="recruitmentDate">Recruitment Date:</label>
            <DatePicker id="recruitmentDate" onChangedHandler={handleChangeValue} defaultDate={getToday()}/>
			<br />                            
			<CreatePatientButton apiEndPt={apiEndPt} patientState={patientState} />
			&nbsp;&nbsp;&nbsp;&nbsp;
			<BackToPreviousPage />
		</div>
	)
};

const CreatePatientButton = ({ apiEndPt, patientState }) => {
	let navigate = useNavigate();

	const handleCreatePatient = async () => {
		console.log('handleCreatePatient');
		try {
			const result = await axios.post(`${apiEndPt}/patient`, patientState);
			navigate(-1)
		}
		catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<button className='button' type="button" onClick={() => { handleCreatePatient() }}>Create</button>
		</>
	);
};

export default NewPatient;
