import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render, waitFor, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import router from 'next/router';
import rootReducer from '../redux/reducers/reducers';
import services from '../redux/services/services';
import userData from '../__mocks__/usersDataMock';
import Users from './users';

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

describe('Users', () => {
  it('Renders correctly enzyme', () => {
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
    const wrapper = shallow(
      <Provider store={testStore}>
        <Users />
      </Provider>
    );

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('List data', () => {
    it('Should render loader whilst waiting for API data', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const spinnerText = 'Loading Users...';
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
          <Users />
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        expect(wrapper.getByText(spinnerText)).toBeInTheDocument();
      });
    });

    it('Should render users list from API data', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const spinnerText = 'Loading Users...';
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
          <Users />
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        expect(wrapper.queryByText(spinnerText)).toBeNull();
      });
      const list = wrapper.getByRole('list', {
        name: /user list/i,
      });
      const { getAllByRole } = within(list);
      const items = getAllByRole('listitem');
      expect(items.length).toBe(6);
      userData.data.forEach((item) => {
        expect(wrapper.getByText(`${item.first_name} ${item.last_name}`)).toBeInTheDocument();
        expect(wrapper.getByText(`Email: ${item.email}`)).toBeInTheDocument();
        expect(wrapper.getByText(`ID: ${item.id}`)).toBeInTheDocument();
      });
    });

    it('Should render error message if API call failure', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const errorText = 'Failed to load users.';
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
      /* create mock of failed get user API call for just this one test */
      jest.mock('../redux/services/services');
      const getUsersByPage = jest.spyOn(services, 'getUsersByPage');
      getUsersByPage.mockImplementationOnce(() => Promise.reject(new Error()));

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <Users />
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        expect(wrapper.getByText(errorText)).toBeInTheDocument();
      });
    });
  });

  describe('Pagination', () => {
    it('Should render pagination buttons which call API to fetch new data', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const pageTwoButtonText = 'page 2';
      const pageOneButtonText = 'Go to page 1';
      const prevPageButtonText = 'NavigateBeforeIcon';
      const nextPageButtonText = 'NavigateNextIcon';
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
          <Users />
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        expect(
          wrapper.getByRole('navigation', { name: 'pagination navigation' })
        ).toBeInTheDocument();
      });
      expect(wrapper.getByTestId(prevPageButtonText)).toBeInTheDocument();
      expect(wrapper.getByTestId(nextPageButtonText)).toBeInTheDocument();
      expect(
        wrapper.getByRole('button', { current: true, name: pageTwoButtonText })
      ).toBeInTheDocument();
      expect(
        wrapper.getByRole('button', { current: false, name: pageOneButtonText })
      ).toBeInTheDocument();

      /* Act */
      fireEvent.click(wrapper.getByRole('button', { current: false, name: pageOneButtonText }));

      /* Assert */
      await waitFor(() => {
        expect(
          wrapper.getByRole('navigation', { name: 'pagination navigation' })
        ).toBeInTheDocument();
      });
      expect(wrapper.getByTestId(prevPageButtonText)).toBeInTheDocument();
      expect(wrapper.getByTestId(nextPageButtonText)).toBeInTheDocument();
      expect(
        wrapper.getByRole('button', { current: true, name: pageTwoButtonText })
      ).toBeInTheDocument();
      expect(
        wrapper.getByRole('button', { current: false, name: pageOneButtonText })
      ).toBeInTheDocument();
    });
  });
});
