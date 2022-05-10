import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../redux/reducers/reducers';
import services from '../redux/services/services';
import CreateUserDialog from './create-user-dialog';

const middleware = [thunkMiddleware];

describe('Create User Dialog', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
    const dialogOpen = true;
    const mockClose = jest.fn();

    /* Act */
    const wrapper = shallow(
      <Provider store={testStore}>
        <CreateUserDialog open={dialogOpen} handleClose={mockClose} />
      </Provider>
    );

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Dialog Text', () => {
    it('Should render title text', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const titleText = 'Create New User';
      const dialogOpen = true;
      const mockClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <CreateUserDialog open={dialogOpen} handleClose={mockClose} />
        </Provider>
      );

      /* Assert */
      expect(wrapper.getByText(titleText)).toBeInTheDocument();
    });
  });

  describe('Dialog Operation', () => {
    it('Should not render if dialog open prop not set', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const titleText = 'Create New User';
      const dialogOpen = false;
      const mockClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <CreateUserDialog open={dialogOpen} handleClose={mockClose} />
        </Provider>
      );

      /* Assert */
      expect(wrapper.queryByText(titleText)).toBeNull();
    });

    it('Should render Save User button', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const dialogOpen = true;
      const saveBtnText = 'Save';
      const mockClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <CreateUserDialog open={dialogOpen} handleClose={mockClose} />
        </Provider>
      );

      /* Assert */
      expect(wrapper.queryByText(saveBtnText)).toBeInTheDocument();
    });

    it('Should render cancel button which should handle close dialog', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const dialogOpen = true;
      const cancelBtnText = 'Cancel';
      const mockClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <CreateUserDialog open={dialogOpen} handleClose={mockClose} />
        </Provider>
      );
      fireEvent.click(wrapper.getByText(cancelBtnText));

      /* Assert */
      expect(wrapper.queryByText(cancelBtnText)).toBeInTheDocument();
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('Should render spinner in place of save button when create API is called', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const dialogOpen = true;
      const saveBtnText = 'Save';
      const mockClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <CreateUserDialog open={dialogOpen} handleClose={mockClose} />
        </Provider>
      );
      fireEvent.change(wrapper.getByLabelText('Email'), { target: { value: 'test@t.com' } });
      fireEvent.change(wrapper.getByLabelText('First Name'), { target: { value: 'Test' } });
      fireEvent.change(wrapper.getByLabelText('Last Name'), { target: { value: 'Case' } });
      fireEvent.click(wrapper.getByText(saveBtnText));

      /* Assert */
      await waitFor(() => {
        expect(wrapper.queryByText(saveBtnText)).toBeNull();
      });
      expect(wrapper.queryByTestId('save-spinner')).toBeInTheDocument();
    });

    it('Should not allow save button functionality if input form is not complete', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const dialogOpen = true;
      const saveBtnText = 'Save';
      const mockClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <CreateUserDialog open={dialogOpen} handleClose={mockClose} />
        </Provider>
      );
      fireEvent.change(wrapper.getByLabelText('Email'), { target: { value: 'test@t.com' } });
      fireEvent.change(wrapper.getByLabelText('First Name'), { target: { value: 'Test' } });
      fireEvent.change(wrapper.getByLabelText('Last Name'), { target: { value: '' } });
      fireEvent.click(wrapper.getByText(saveBtnText));

      /* Assert */
      await waitFor(() => {
        expect(wrapper.queryByText(saveBtnText)).toBeInTheDocument();
      });
      expect(wrapper.queryByTestId('save-spinner')).toBeNull();
    });

    it('Should remain open if create user API fails', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const dialogOpen = true;
      const saveBtnText = 'Save';
      const mockClose = jest.fn();
      /* create mock of failed create user API call for just this one test */
      jest.mock('../redux/services/services');
      const createUser = jest.spyOn(services, 'createUser');
      createUser.mockImplementationOnce(() => Promise.reject(new Error()));

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <CreateUserDialog open={dialogOpen} handleClose={mockClose} />
        </Provider>
      );
      fireEvent.change(wrapper.getByLabelText('Email'), { target: { value: 'test@t.com' } });
      fireEvent.change(wrapper.getByLabelText('First Name'), { target: { value: 'Test' } });
      fireEvent.change(wrapper.getByLabelText('Last Name'), { target: { value: 'Name' } });
      fireEvent.click(wrapper.getByText(saveBtnText));

      /* Assert */
      await waitFor(() => {
        expect(wrapper.queryByText(saveBtnText)).toBeInTheDocument();
      });
      expect(wrapper.queryByTestId('save-spinner')).toBeNull();
    });
  });
});
