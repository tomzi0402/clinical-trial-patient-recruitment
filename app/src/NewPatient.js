import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from './component/Select.js';
import BackToPreviousPage from './component/BackToPreviousPage.js';
import DatePicker from './component/DatePicker.js';

import './style/App.css';

const NewPatient = ({ apiEndPt }) => {
	// console.log('render NewPatient()');

	const [patientState, setPatientState] = React.useState({ firstName: "", lastName: "", dob: "", gender: { id : ""}, condition: { id : ""}, study: { id : ""}, recruitmentDate: "" });
    const [genderList, setGenderList] = React.useState({data: []});
    const [conditionList, setConditionList] = React.useState({data: []});
    const [studyList, setStudyList] = React.useState({data: []});
	const [isLoading, setIsLoading] = React.useState({loadingGender: true, loadingCondition: true, loadingStudy: true});
	const [errors, setErrors] = React.useState({firstName: "",	lastName: "", dob: "", gender: "", condition: "", study: "", recruitmentDate: ""});

    const getToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };       

	const validate = () => {
		const newErrors = {};
		if (!patientState.firstName) {
		  newErrors.firstName = 'First Name is required';
		}
		if (!patientState.lastName) {
		  newErrors.lastName = 'Last Name is required';
		}
		if (!patientState.dob) {
			newErrors.dob = 'Date of Birth is required';
		 }		
		if (!patientState.gender.id) {
			newErrors.gender = 'Gender is required';
		}	
		if (!patientState.condition.id) {
			newErrors.condition = 'Condition is required';
		}	
		if (!patientState.study.id) {
			newErrors.study = 'Study is required';
		}				
		if (!patientState.recruitmentDate) {
			newErrors.recruitmentDate = 'Recruitment Date is required';
		}							  
		return newErrors;
	};	

    const fetchGenderList = async() => {
		try {
			const result = await axios.get(`${apiEndPt}/gender`);
			// console.log(result.data);
			setGenderList({ data: result.data});
            setPatientState((prevState) => ({...prevState, gender: {...prevState.gender, id: result.data[0].id}}));
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
			// console.log(result.data);
			setConditionList({ data: result.data});
            setPatientState((prevState) => ({...prevState, condition: {...prevState.condition, id: result.data[0].id}}));
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
			const result = await axios.get(`${apiEndPt}/study/allowRecruiting`);
			// console.log(result.data);
			setStudyList({ data: result.data});
            setPatientState((prevState) => ({...prevState, study: {...prevState.study, id: result.data[0].id}}));
		}
		catch (error) {
			console.log(error);
		}
		finally {
			setIsLoading((prevState) => ({...prevState, loadingStudy: false}));
		}		
    };        

	const handleChangeValue = (event) => {
		// console.log(event.target.id);
        // console.log(patientState);
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

	const CreatePatientButton = ({ apiEndPt, patientState }) => {
		let navigate = useNavigate();
	
		const handleCreatePatient = async () => {
			// console.log('handleCreatePatient');

			const validationErrors = validate();
			if (Object.keys(validationErrors).length > 0) {
			  	setErrors(validationErrors);
			} 
			else {
			  	setErrors({});
				try {
					const result = await axios.post(`${apiEndPt}/patient`, patientState);
					navigate(-1)
				}
				catch (error) {
					console.log(error);
				}				
			}
		};
	
		return (
			<>
				<button className='button' type="button" onClick={() => { handleCreatePatient() }}>Create</button>
			</>
		);
	};	

    React.useEffect(() => {
        fetchGenderList();
        fetchConditionList();
        fetchStudyList();        
        var today = getToday();
        setPatientState((prevState) => ({...prevState, recruitmentDate: today}));        
    }, []);

	if (isLoading.loadingGender || isLoading.loadingCondition || isLoading.loadingStudy) {
		return <div>Loading...</div>;
	}			

	return (
		<div className='editForm'>
			<label htmlFor="firstName">First Name:<span style={{ color: 'red' }}>*</span></label>
			<input id="firstName" type="text" value={patientState.firstName} onChange={handleChangeValue} required></input>
			{errors.firstName && <p className="error">{errors.firstName}</p>}
			<br />
			<label htmlFor="lastName">Last Name:<span style={{ color: 'red' }}>*</span></label>
			<input id="lastName" type="text" value={patientState.lastName} onChange={handleChangeValue} required></input>
			{errors.lastName && <p className="error">{errors.lastName}</p>}
			<br />   
			<label htmlFor="dob">Date of Birth:<span style={{ color: 'red' }}>*</span></label>
            <DatePicker id="dob" onChangedHandler={handleChangeValue} required/>
			{errors.dob && <p className="error">{errors.dob}</p>}
			<br />                             
			<label htmlFor="gender">Gender:<span style={{ color: 'red' }}>*</span></label>
            <Select id="gender" list={genderList} onChangeHandler={handleChangeValue} required/>
			{errors.gender && <p className="error">{errors.gender}</p>}
			<br />
			<label htmlFor="condition">Condition:<span style={{ color: 'red' }}>*</span></label>
            <Select id="condition" list={conditionList} onChangeHandler={handleChangeValue} required/>
			{errors.condition && <p className="error">{errors.condition}</p>}
			<br />
			<label htmlFor="study">Study:<span style={{ color: 'red' }}>*</span></label>
            <Select id="study" list={studyList} onChangeHandler={handleChangeValue} required/>
			{errors.study && <p className="error">{errors.study}</p>}
			<br />           
			<label htmlFor="recruitmentDate">Recruitment Date:<span style={{ color: 'red' }}>*</span></label>
            <DatePicker id="recruitmentDate" onChangedHandler={handleChangeValue} defaultDate={getToday()} required/>
			{errors.recruitmentDate && <p className="error">{errors.recruitmentDate}</p>}
			<br />                            
			<CreatePatientButton apiEndPt={apiEndPt} patientState={patientState} />
			&nbsp;&nbsp;&nbsp;&nbsp;
			<BackToPreviousPage />
		</div>
	)
};


export default NewPatient;
