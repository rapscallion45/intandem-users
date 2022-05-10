import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import userMock from '../__mocks__/userMock';
import rootReducer from '../redux/reducers/reducers';
import EditUserDialog from './edit-user-dialog';

const middleware = [thunkMiddleware];

describe('Edit User Dialog', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
    const dialogOpen = true;
    const mockClose = jest.fn();

    /* Act */
    const wrapper = shallow(
      <Provider store={testStore}>
        <EditUserDialog open={dialogOpen} handleClose={mockClose} userData={userMock} />
      </Provider>
    );

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Dialog Text', () => {
    it('Should render title text', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const titleText = 'Edit User';
      const dialogOpen = true;
      const mockClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <EditUserDialog open={dialogOpen} handleClose={mockClose} userData={userMock} />
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
      const titleText = 'Edit User';
      const dialogOpen = false;
      const handleClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <EditUserDialog open={dialogOpen} handleClose={handleClose} userData={userMock} />
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
          <EditUserDialog open={dialogOpen} handleClose={mockClose} userData={userMock} />
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
          <EditUserDialog open={dialogOpen} handleClose={mockClose} userData={userMock} />
        </Provider>
      );
      fireEvent.click(wrapper.getByText(cancelBtnText));

      /* Assert */
      expect(wrapper.queryByText(cancelBtnText)).toBeInTheDocument();
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('Should render spinner in place of save button when edit API is called', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const dialogOpen = true;
      const saveBtnText = 'Save';
      const mockClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <EditUserDialog open={dialogOpen} handleClose={mockClose} userData={userMock} />
        </Provider>
      );
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
          <EditUserDialog open={dialogOpen} handleClose={mockClose} userData={userMock} />
        </Provider>
      );
      fireEvent.change(wrapper.getByLabelText('Last Name'), { target: { value: '' } });
      fireEvent.click(wrapper.getByText(saveBtnText));

      /* Assert */
      await waitFor(() => {
        expect(wrapper.queryByText(saveBtnText)).toBeInTheDocument();
      });
      expect(wrapper.queryByTestId('save-spinner')).toBeNull();
    });
  });
});
