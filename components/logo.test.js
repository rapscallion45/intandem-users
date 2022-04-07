import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import toJson from 'enzyme-to-json';
import Logo from './logo';

describe('Logo', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    /* Act */
    const wrapper = shallow(<Logo />);

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Logo Image', () => {
    it('Should render logo image from expected source', () => {
      /* Arrange */
      /* Act */
      const wrapper = render(<Logo />);
      const image = wrapper.getByAltText('logo-image');

      /* Assert */
      expect(wrapper.getByAltText('logo-image')).toBeInTheDocument();
      expect(image.src).toContain('/static/logo.webp');
    });
  });
});
