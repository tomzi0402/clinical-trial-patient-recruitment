import * as React from 'react';
import '../style/App.css';

const Select = ({ id, list, onChangeHandler, selectedId }) => {
	console.log('render Select');

	return (
		<select id={id} onChange={onChangeHandler} value={selectedId ? selectedId : ''}>
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
