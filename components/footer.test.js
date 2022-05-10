import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import toJson from 'enzyme-to-json';
import Footer from './footer';

describe('Footer', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    /* Act */
    const wrapper = shallow(<Footer />);

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Copyright date', () => {
    it('Should render this year', () => {
      /* Arrange */
      const today = new Date();
      const date = today.getFullYear();

      /* Act */
      const wrapper = render(<Footer />);

      /* Assert */
      expect(wrapper.getByText(date)).toBeInTheDocument();
    });
  });

  describe('Linkedin link', () => {
    it('Should render link to Linkedin profile', () => {
      /* Arrange */
      const linkText = 'Carl Scrivener';
      const linkUrl = 'https://www.linkedin.com/in/carlscrivener/';

      /* Act */
      const wrapper = render(<Footer />);

      /* Assert */
      expect(wrapper.getByText(linkText).closest('a')).toHaveAttribute('href', linkUrl);
    });
  });
});
