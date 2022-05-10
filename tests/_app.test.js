import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../pages/_app';

describe('_app', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    /* Act */
    const wrapper = shallow(<App />);

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
