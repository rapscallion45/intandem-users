import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import userMock from '../__mocks__/userMock';
import rootReducer from '../redux/reducers/reducers';
import services from '../redux/services/services';
import DeleteUserDialog from './delete-user-dialog';

const middleware = [thunkMiddleware];

describe('Delete User Dialog', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
    const dialogOpen = true;
    const mockConfirm = jest.fn();
    const mockClose = jest.fn();

    /* Act */
    const wrapper = shallow(
      <Provider store={testStore}>
        <DeleteUserDialog
          open={dialogOpen}
          userData={userMock}
          handleClose={mockClose}
          confirm={mockConfirm}
        />
      </Provider>
    );

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Dialog Text', () => {
    it('Should render title text', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const titleText = 'Are you sure you want to delete';
      const dialogOpen = true;
      const mockConfirm = jest.fn();
      const mockClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <DeleteUserDialog
            open={dialogOpen}
            userData={userMock}
            handleClose={mockClose}
            confirm={mockConfirm}
          />
        </Provider>
      );

      /* Assert */
      expect(wrapper.getByText(titleText, { exact: false })).toBeInTheDocument();
    });

    it('Should render User name in title text', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const userFirstName = userMock.first_name;
      const userLastName = userMock.last_name;
      const titleText = `Are you sure you want to delete ${userFirstName} ${userLastName}?`;
      const dialogOpen = true;
      const mockConfirm = jest.fn();
      const mockClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <DeleteUserDialog
            open={dialogOpen}
            userData={userMock}
            handleClose={mockClose}
            confirm={mockConfirm}
          />
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
      const titleText = 'Are you sure you want to delete';
      const dialogOpen = false;
      const mockConfirm = jest.fn();
      const mockClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <DeleteUserDialog
            open={dialogOpen}
            userData={userMock}
            handleClose={mockClose}
            confirm={mockConfirm}
          />
        </Provider>
      );

      /* Assert */
      expect(wrapper.queryByText(titleText)).toBeNull();
    });

    it('Should render delete confirm button which should call delete confirmation handler', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const dialogOpen = true;
      const deleteBtnText = 'Delete User';
      const mockConfirm = jest.fn();
      const mockClose = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <DeleteUserDialog
            open={dialogOpen}
            userData={userMock}
            handleClose={mockClose}
            confirm={mockConfirm}
          />
        </Provider>
      );
      fireEvent.click(screen.getByText(deleteBtnText));

      /* Assert */
      expect(wrapper.queryByText(deleteBtnText)).toBeInTheDocument();
      expect(mockConfirm).toHaveBeenCalledTimes(1);
    });

    it('Should render cancel button which should handle close dialog', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const dialogOpen = true;
      const cancelBtnText = 'Cancel';
      const mockClose = jest.fn();
      const mockConfirm = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <DeleteUserDialog
            open={dialogOpen}
            userData={userMock}
            handleClose={mockClose}
            confirm={mockConfirm}
          />
        </Provider>
      );
      fireEvent.click(screen.getByText(cancelBtnText));

      /* Assert */
      expect(wrapper.queryByText(cancelBtnText)).toBeInTheDocument();
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('Should render spinner in place of delete confirm button when delete API is called', () => {
      /* Arrange */
      const testStore = createStore(
        rootReducer,
        { users: { deleting: true, deleted: false } },
        applyMiddleware(...middleware)
      );
      const dialogOpen = true;
      const deleteBtnText = 'Delete User';
      const mockClose = jest.fn();
      const mockConfirm = jest.fn();

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <DeleteUserDialog
            open={dialogOpen}
            userData={userMock}
            handleClose={mockClose}
            confirm={mockConfirm}
          />
        </Provider>
      );

      /* Assert */
      expect(wrapper.queryByText(deleteBtnText)).toBeNull();
      expect(wrapper.queryByTestId('delete-spinner')).toBeInTheDocument();
    });

    it('Should remain open if delete user API fails', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const dialogOpen = true;
      const mockClose = jest.fn();
      const mockConfirm = jest.fn();
      /* create mock of failed delete user API call for just this one test */
      jest.mock('../redux/services/services');
      const deleteUser = jest.spyOn(services, 'deleteUser');
      deleteUser.mockImplementationOnce(() => Promise.reject(new Error()));

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <DeleteUserDialog
            open={dialogOpen}
            userData={userMock}
            handleClose={mockClose}
            confirm={mockConfirm}
          />
        </Provider>
      );
      fireEvent.click(wrapper.getByTestId('delete-confirm-btn'));

      /* Assert */
      await waitFor(() => {
        expect(wrapper.getByTestId('delete-confirm-btn')).toBeInTheDocument();
      });
      expect(wrapper.queryByTestId('delete-spinner')).toBeNull();
    });
  });
});
