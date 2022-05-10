import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render } from '@testing-library/react';
import router from 'next/router';
import Layout from './layout';

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

describe('Layout', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    const TestChild = function TestChild() {
      return <div>Test Child</div>;
    };
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
      <Layout>
        <TestChild />
      </Layout>
    );

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Elements', () => {
    it('Should render header with correct title text', () => {
      /* Arrange */
      const TestChild = function TestChild() {
        return <div>Test Child</div>;
      };
      const titleText = 'Intandem Users';
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
        <Layout>
          <TestChild />
        </Layout>
      );

      /* Assert */
      expect(wrapper.getByText(titleText)).toBeInTheDocument();
    });

    it('Should render link to home page', () => {
      /* Arrange */
      const TestChild = function TestChild() {
        return <div>Test Child</div>;
      };
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
        <Layout>
          <TestChild />
        </Layout>
      );

      /* Assert */
      expect(wrapper.getByRole('link', { name: 'logo-image' })).toBeInTheDocument();
    });

    it('Should render passed children components', () => {
      /* Arrange */
      const TestChild = function TestChild() {
        return <div>Test Child</div>;
      };
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
        <Layout>
          <TestChild />
        </Layout>
      );

      /* Assert */
      expect(wrapper.getByText('Test Child')).toBeInTheDocument();
    });
  });
});
