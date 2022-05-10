import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import toJson from 'enzyme-to-json';
import Page from './page';

describe('Page', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    const mockChildren = (
      <div>
        <p>Child 1</p>
        <p>child 2</p>
      </div>
    );

    /* Act */
    const wrapper = shallow(<Page>{mockChildren}</Page>);

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Page Title', () => {
    it('Should render the passed text', () => {
      /* Arrange */
      const mockChildren = (
        <div>
          <p>Child 1</p>
          <p>child 2</p>
        </div>
      );
      const testPageTitle = 'Test Page | Test';

      /* Act */
      const wrapper = render(<Page title={testPageTitle}>{mockChildren}</Page>);

      /* Assert */
      expect(wrapper.getByText(testPageTitle)).toBeInTheDocument();
    });
  });

  describe('Child Components', () => {
    it('Should render passed children components', () => {
      /* Arrange */
      const mockChildren = (
        <div>
          <p>Child 1</p>
          <p>Child 2</p>
        </div>
      );

      /* Act */
      const wrapper = render(<Page>{mockChildren}</Page>);

      /* Assert */
      expect(wrapper.getByText('Child 1')).toBeInTheDocument();
      expect(wrapper.getByText('Child 2')).toBeInTheDocument();
    });
  });
});
