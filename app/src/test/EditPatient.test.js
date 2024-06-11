import {render} from '@testing-library/react';
import EditPatient from '../EditPatient';

test("render edit patient page initially", () => {
    const {getByTestId} = render(<EditPatient/>);
    expect(getByTestId('loading')).toBeInTheDocument();
});
