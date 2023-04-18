import {fireEvent, render, screen, act, waitFor} from '@testing-library/react-native';

import SignInForm from '../../components/SignInForm';

describe('SignInForm', () => {
  it('calls onsubmit function', async () => {
    const onSubmitMock = jest.fn();
    render(<SignInForm onSubmit={onSubmitMock}/>);

    fireEvent.changeText(screen.getByPlaceholderText('Login'), 'matti');
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
    act(() => {
      fireEvent.press(screen.getByText('Login'));
    })

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
      expect(onSubmitMock.mock.calls[0][0]).toEqual({
        username: 'matti',
        password: 'password'
      })
    })
  })
})