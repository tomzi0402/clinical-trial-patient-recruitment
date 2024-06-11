import React, { useState } from 'react';

const DatePicker = ({id, onChangedHandler, defaultDate}) => {
  // console.log("defaultDate=" + defaultDate);
  
  const [selectedDate, setSelectedDate] = useState(defaultDate ? defaultDate : '');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    onChangedHandler(event);
  };

  return (    
      <input type="date" id={id} value={selectedDate} onChange={handleDateChange} data-testid="date-input"/>
  );
};

export default DatePicker;
