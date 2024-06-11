import {render} from '@testing-library/react';
import EditStudy from '../EditStudy';

test("render edit study page initially", () => {
    const {getByTestId} = render(<EditStudy/>);
    expect(getByTestId('loading')).toBeInTheDocument();
});
