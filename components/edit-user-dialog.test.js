import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../redux/reducers/reducers';
import EditUserDialog from './edit-user-dialog';

const middleware = [thunkMiddleware];

describe('Edit User Dialog', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
    const dialogOpen = true;

    /* Act */
    const wrapper = shallow(
      <Provider store={testStore}>
        <EditUserDialog open={dialogOpen} />
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

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <EditUserDialog open={dialogOpen} />
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

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <EditUserDialog open={dialogOpen} />
        </Provider>
      );

      /* Assert */
      expect(wrapper.queryByText(titleText)).toBeNull();
    });
  });
});
