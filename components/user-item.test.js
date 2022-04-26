import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import router from 'next/router';
import userMock from '../__mocks__/userMock';
import rootReducer from '../redux/reducers/reducers';
import UserItem from './user-item';

const middleware = [thunkMiddleware];

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe('User Item', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));

    /* Act */
    const wrapper = shallow(
      <Provider store={testStore}>
        <UserItem userData={userMock} />
      </Provider>
    );

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Information Text', () => {
    it('Should render the correct user info fields', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const useRouter = jest.spyOn(router, 'useRouter');
      useRouter.mockImplementation(() => ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: jest.fn(),
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null),
      }));

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <UserItem userData={userMock} />
        </Provider>
      );

      /* Assert */
      expect(wrapper.getByText(`${userMock.first_name} ${userMock.last_name}`)).toBeInTheDocument();
      expect(wrapper.getByText(`ID: ${userMock.id}`)).toBeInTheDocument();
      expect(wrapper.getByText(`Email: ${userMock.email}`)).toBeInTheDocument();
    });
  });

  describe('Operations', () => {
    it('Should render Edit User button which opens edit dialog', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const editBtnText = 'Edit User';
      const saveBtnText = 'Save';
      const useRouter = jest.spyOn(router, 'useRouter');
      useRouter.mockImplementation(() => ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: jest.fn(),
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null),
      }));

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <UserItem userData={userMock} />
        </Provider>
      );

      /* Assert */
      expect(wrapper.queryByText(editBtnText)).toBeInTheDocument();
      expect(wrapper.queryByText(saveBtnText)).toBeNull();

      /* Act */
      fireEvent.click(wrapper.getByText(editBtnText));

      /* Assert */
      await waitFor(() => {
        expect(wrapper.queryByText(saveBtnText)).toBeInTheDocument();
      });
    });

    it('Should render Delete User button which should call delete confirmation handler', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const deleteBtnText = 'Delete User';
      const deleteUserTitleText = 'Are you sure you want to delete';
      const useRouter = jest.spyOn(router, 'useRouter');
      useRouter.mockImplementation(() => ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: jest.fn(),
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null),
      }));

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <UserItem userData={userMock} />
        </Provider>
      );

      /* Assert */
      expect(wrapper.queryByText(deleteBtnText)).toBeInTheDocument();
      expect(wrapper.queryByText(deleteUserTitleText)).toBeNull();

      /* Act */
      fireEvent.click(wrapper.getByText(deleteBtnText));

      /* Assert */
      await waitFor(() => {
        expect(wrapper.getByText(deleteUserTitleText, { exact: false })).toBeInTheDocument();
      });
    });
  });
});
