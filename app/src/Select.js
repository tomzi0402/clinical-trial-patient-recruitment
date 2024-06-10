import * as React from 'react';
import './App.css';

const Select = ({ list, onChangeHandler, selectedStatus }) => {
	console.log('render Select');

	return (
		<select id='status' onChange={onChangeHandler} value={selectedStatus ? selectedStatus.id : null}>
			{
				list.data.map((item) => {
					return (
						<option key={item.id} value={item.id}>{item.name}</option>
					);
				})
			}
		</select>
	)
};

export default React.memo(Select);
