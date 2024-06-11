import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/App.css';

const BackToPreviousPage = () => {
	let navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1)
	}
	return (
		<>
			<button className='button' type="button" onClick={handleGoBack} data-testid="cancel-button">Cancel</button>
		</>
	);
}

export default BackToPreviousPage;
