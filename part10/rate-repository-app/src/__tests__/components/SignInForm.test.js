import {fireEvent, render, screen, act} from '@testing-library/react-native';

import SignInForm from '../../components/SignInForm';

describe('SignInForm', () => {
  it('calls onsubmit function', () => {
    const onSubmitMock = jest.fn();
    act(() => {
      render(<SignInForm onSubmit={onSubmitMock}/>);
    })

    fireEvent.changeText(screen.getByPlaceholderText('Login'), 'matti');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
    act(() => {
      fireEvent.press(screen.getByText('Login'));
    })

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock.mock.calls[0][0]).toEqual({
      login: 'matti',
      password: 'password'
    })
  })
})