import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import router from 'next/router';
import rootReducer from '../redux/reducers/reducers';
import Index from '../pages/index';

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

describe('Index', () => {
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
        <Index />
      </Provider>
    );

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Page Content', () => {
    it('Should render breadcrumbs home root, with correct title', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const titleText = 'Users List';
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
          <Index />
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        expect(wrapper.getByLabelText('breadcrumb')).toBeInTheDocument();
      });
      expect(wrapper.getByText(titleText));
    });

    it('Should render Crete User button, which opens Create User dialog', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const createBtnText = 'Create User';
      const createUserDialogTitleText = 'Create New User';
      const cancelCreateUserBtnText = 'Cancel';
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
          <Index />
        </Provider>
      );
      fireEvent.click(wrapper.getByRole('button', { name: createBtnText }));

      /* Assert */
      await waitFor(() => {
        expect(wrapper.getByText(createUserDialogTitleText)).toBeInTheDocument();
      });

      /* Act */
      fireEvent.click(wrapper.getByRole('button', { name: cancelCreateUserBtnText }));

      /* Assert */
      await waitFor(() => {
        expect(wrapper.queryByText(createUserDialogTitleText)).toBeNull();
      });
    });

    it('Should render spinner in place of button when saving new user', async () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const createBtnText = 'Create User';
      const createUserDialogTitleText = 'Create New User';
      const saveCreateUserBtnText = 'Save';
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
          <Index />
        </Provider>
      );
      fireEvent.click(wrapper.getByRole('button', { name: createBtnText }));

      /* Assert */
      await waitFor(() => {
        expect(wrapper.getByText(createUserDialogTitleText)).toBeInTheDocument();
      });

      /* Act */
      fireEvent.change(wrapper.getByLabelText('First Name'), { target: { value: 'John' } });
      fireEvent.change(wrapper.getByLabelText('Last Name'), { target: { value: 'Smith' } });
      fireEvent.change(wrapper.getByLabelText('Email'), {
        target: { value: 'john.smith@test.com' },
      });
      fireEvent.click(wrapper.getByRole('button', { name: saveCreateUserBtnText }));

      /* Assert */
      await waitFor(() => {
        expect(wrapper.queryByTestId('create-user-spinner')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(wrapper.queryByText(createUserDialogTitleText)).toBeNull();
      });
      expect(wrapper.queryByTestId('create-user-spinner')).toBeNull();
      expect(wrapper.getByText(createBtnText)).toBeInTheDocument();
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
          <Index />
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
