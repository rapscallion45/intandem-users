import React from 'react';
import { shallow } from 'enzyme';
import router from 'next/router';
import toJson from 'enzyme-to-json';
import Link from './link';

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

describe('Link', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
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
    const wrapper = shallow(<Link href="/" />);

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Options', () => {
    it('renders external link correctly', () => {
      /* Arrange */
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
      const wrapper = shallow(<Link href="http://test.com" />);

      /* Assert */
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders external link with no style correctly', () => {
      /* Arrange */
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
      const wrapper = shallow(<Link href="http://test.com" noLinkStyle />);

      /* Assert */
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders link with no style correctly', () => {
      /* Arrange */
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
      const wrapper = shallow(<Link href="/" noLinkStyle />);

      /* Assert */
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
