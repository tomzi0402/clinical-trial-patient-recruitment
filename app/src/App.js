import * as React from 'react'
import './style/App.css';
import StudyList from './StudyList.js'
import NewStudy from './NewStudy.js'
import EditStudy from './EditStudy.js'
import PatientList from './PatientList.js'
import NewPatient from './NewPatient.js'
import EditPatient from './EditPatient.js';
import { BrowserRouter as Router, Link, Switch, Routes, Route, Redirect } from 'react-router-dom';

const title = 'Clinical Trial Patient Recruitment System'
const API_ENDPOINT = 'http://localhost:8080/api'

function App() {
  console.log('render App()')

  return (
    <div className='App'>
      <h1>{title}</h1>
      <Router>
        <Routes>
          <Route path='/study' element={<StudyList apiEndPt={API_ENDPOINT}/>}/>
          <Route path='/newStudy' element={<NewStudy apiEndPt={API_ENDPOINT}/>}/>
          <Route path='/editStudy/:studyId' element={<EditStudy apiEndPt={API_ENDPOINT}/>}/>
          <Route path='/patient' element={<PatientList apiEndPt={API_ENDPOINT}/>}/>
          <Route path='/newPatient' element={<NewPatient apiEndPt={API_ENDPOINT}/>}/>
          <Route path='/editPatient/:patientId' element={<EditPatient apiEndPt={API_ENDPOINT}/>}/>
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
