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
import services from '../redux/services/services';
import UserProfile from './user-profile';

const middleware = [thunkMiddleware];

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/user',
      pathname: '',
      query: { id: 7 },
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

describe('User Profile', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
    const useRouter = jest.spyOn(router, 'useRouter');
    useRouter.mockImplementation(() => ({
      route: '/user',
      pathname: '',
      query: { id: 7 },
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
    const wrapper = shallow(
      <Provider store={testStore}>
        <UserProfile />
      </Provider>
    );

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Profile Information', () => {
    it('Should render loader whilst waiting for API data', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const spinnerText = 'Loading user profile...';
      const useRouter = jest.spyOn(router, 'useRouter');
      useRouter.mockImplementation(() => ({
        route: '/user',
        pathname: '',
        query: { id: 7 },
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
          <UserProfile />
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        expect(wrapper.getByText(spinnerText)).toBeInTheDocument();
      });
      expect(wrapper.queryByAltText(userMock.last_name)).toBeNull();
      expect(wrapper.queryByLabelText(`First Name`)).toBeNull();
      expect(wrapper.queryByLabelText(`Last Name`)).toBeNull();
      expect(wrapper.queryByLabelText(`Email`)).toBeNull();
      expect(wrapper.queryByDisplayValue(userMock.first_name)).toBeNull();
      expect(wrapper.queryByDisplayValue(userMock.last_name)).toBeNull();
      expect(wrapper.queryByDisplayValue(userMock.email)).toBeNull();
    });

    it('Should render the correct user information fields from API data', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const useRouter = jest.spyOn(router, 'useRouter');
      useRouter.mockImplementation(() => ({
        route: '/user',
        pathname: '',
        query: { id: 7 },
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
          <UserProfile />
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        /* user profile img should have user last name as alt text */
        expect(wrapper.getByAltText(userMock.last_name)).toBeInTheDocument();
      });
      expect(wrapper.getByLabelText(`First Name`)).toBeInTheDocument();
      expect(wrapper.getByLabelText(`Last Name`)).toBeInTheDocument();
      expect(wrapper.getByLabelText(`Email`)).toBeInTheDocument();
      expect(wrapper.getByDisplayValue(userMock.first_name)).toBeInTheDocument();
      expect(wrapper.getByDisplayValue(userMock.last_name)).toBeInTheDocument();
      expect(wrapper.getByDisplayValue(userMock.email)).toBeInTheDocument();
    });

    it('Should render error message if API call failure', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const errorText = 'Failed to load user profile.';
      const useRouter = jest.spyOn(router, 'useRouter');
      useRouter.mockImplementation(() => ({
        route: '/user',
        pathname: '',
        query: { id: 7 },
        asPath: '',
        push: jest.fn(),
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null),
      }));
      /* create mock of failed get user API call for just this one test */
      jest.mock('../redux/services/services');
      const getUserByIdMock = jest.spyOn(services, 'getUserById');
      getUserByIdMock.mockImplementationOnce(() => Promise.reject(new Error()));

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <UserProfile />
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        expect(wrapper.getByText(errorText)).toBeInTheDocument();
      });
      expect(wrapper.queryByAltText(userMock.last_name)).toBeNull();
      expect(wrapper.queryByLabelText(`First Name`)).toBeNull();
      expect(wrapper.queryByLabelText(`Last Name`)).toBeNull();
      expect(wrapper.queryByLabelText(`Email`)).toBeNull();
      expect(wrapper.queryByDisplayValue(userMock.first_name)).toBeNull();
      expect(wrapper.queryByDisplayValue(userMock.last_name)).toBeNull();
      expect(wrapper.queryByDisplayValue(userMock.email)).toBeNull();
    });

    it('Should render error message if user ID not found', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const errorText = 'Failed to load user profile.';
      const useRouter = jest.spyOn(router, 'useRouter');
      useRouter.mockImplementation(() => ({
        route: '/user',
        pathname: '',
        query: { id: 8 },
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
          <UserProfile />
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        expect(wrapper.getByText(errorText)).toBeInTheDocument();
      });
      expect(wrapper.queryByAltText(userMock.last_name)).toBeNull();
      expect(wrapper.queryByLabelText(`First Name`)).toBeNull();
      expect(wrapper.queryByLabelText(`Last Name`)).toBeNull();
      expect(wrapper.queryByLabelText(`Email`)).toBeNull();
      expect(wrapper.queryByDisplayValue(userMock.first_name)).toBeNull();
      expect(wrapper.queryByDisplayValue(userMock.last_name)).toBeNull();
      expect(wrapper.queryByDisplayValue(userMock.email)).toBeNull();
    });
  });

  describe('Operations', () => {
    it('Should render Save button which calls save handler', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const saveBtnText = 'Save';
      const useRouter = jest.spyOn(router, 'useRouter');
      useRouter.mockImplementation(() => ({
        route: '/user',
        pathname: '',
        query: { id: 7 },
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
          <UserProfile />
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        expect(wrapper.queryByText(saveBtnText)).toBeInTheDocument();
      });

      /* Act */
      fireEvent.click(wrapper.getByText(saveBtnText));

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
        route: '/user',
        pathname: '',
        query: { id: 7 },
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
          <UserProfile />
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        expect(wrapper.queryByText(deleteBtnText)).toBeInTheDocument();
      });

      /* Act */
      fireEvent.click(wrapper.getByText(deleteBtnText));

      /* Assert */
      await waitFor(() => {
        expect(wrapper.getByText(deleteUserTitleText, { exact: false })).toBeInTheDocument();
      });
    });
  });
});
