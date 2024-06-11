import {render} from '@testing-library/react';
import NewPatient from '../NewPatient';

test("render new patient page initially", () => {
    const {getByTestId} = render(<NewPatient/>);
    expect(getByTestId('loading')).toBeInTheDocument();
});
