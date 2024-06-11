import {render} from '@testing-library/react';
import NewStudy from '../NewStudy';

test("render new study page initially", () => {
    const {getByTestId} = render(<NewStudy/>);
    expect(getByTestId('loading')).toBeInTheDocument();
});
