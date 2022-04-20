import React from 'react';
import { shallow } from 'enzyme';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import toJson from 'enzyme-to-json';
import userMock from '../__mocks__/userMock';
import ProfileForm from './profile-form';

describe('Profile Form', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    const mockCancel = jest.fn();
    const mockSave = jest.fn();
    const mockSaving = false;
    const mockShowCancel = true;

    /* Act */
    const wrapper = shallow(
      <ProfileForm
        userData={userMock}
        handleCancel={mockCancel}
        handleSave={mockSave}
        saving={mockSaving}
        showCancel={mockShowCancel}
      />
    );

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Form Fields', () => {
    it('Should render the correct input fields', () => {
      /* Arrange */
      const mockCancel = jest.fn();
      const mockSave = jest.fn();
      const mockSaving = false;
      const mockShowCancel = true;

      /* Act */
      const wrapper = render(
        <ProfileForm
          userData={userMock}
          handleCancel={mockCancel}
          handleSave={mockSave}
          saving={mockSaving}
          showCancel={mockShowCancel}
        />
      );

      /* Assert */
      expect(wrapper.getByLabelText('Email')).toBeInTheDocument();
      expect(wrapper.getByLabelText('First Name')).toBeInTheDocument();
      expect(wrapper.getByLabelText('Last Name')).toBeInTheDocument();
    });
  });

  describe('Form Operation', () => {
    it('Should render Save User button', async () => {
      /* Arrange */
      const mockCancel = jest.fn();
      const mockSave = jest.fn();
      const mockSaving = false;
      const mockShowCancel = true;
      const saveBtnText = 'Save';
      const user = userEvent.setup();

      /* Act */
      const wrapper = render(
        <ProfileForm
          userData={userMock}
          handleCancel={mockCancel}
          handleSave={mockSave}
          saving={mockSaving}
          showCancel={mockShowCancel}
        />
      );
      await user.click(wrapper.getByText(saveBtnText));

      /* Assert */
      expect(wrapper.queryByText(saveBtnText)).toBeInTheDocument();
      await waitFor(() => {
        expect(mockSave).toHaveBeenCalledTimes(1);
      });
    });

    it('Should not allow Save button functionality if form not complete', async () => {
      /* Arrange */
      const mockCancel = jest.fn();
      const mockSave = jest.fn();
      const mockSaving = false;
      const mockShowCancel = true;
      const saveBtnText = 'Save';

      /* Act */
      const wrapper = render(
        <ProfileForm
          userData={userMock}
          handleCancel={mockCancel}
          handleSave={mockSave}
          saving={mockSaving}
          showCancel={mockShowCancel}
        />
      );
      act(() => {
        fireEvent.change(wrapper.getByLabelText('Last Name'), { target: { value: '' } });
      });
      fireEvent.click(wrapper.getByText(saveBtnText));

      /* Assert */
      expect(wrapper.queryByText(saveBtnText)).toBeInTheDocument();
      expect(mockSave).toHaveBeenCalledTimes(0);
    });

    it('Should render Cancel button if prop set', () => {
      /* Arrange */
      const mockCancel = jest.fn();
      const mockSave = jest.fn();
      const mockSaving = false;
      const mockShowCancel = true;
      const cancelBtnText = 'Cancel';

      /* Act */
      const wrapper = render(
        <ProfileForm
          userData={userMock}
          handleCancel={mockCancel}
          handleSave={mockSave}
          saving={mockSaving}
          showCancel={mockShowCancel}
        />
      );
      fireEvent.click(wrapper.getByText(cancelBtnText));

      /* Assert */
      expect(wrapper.queryByText(cancelBtnText)).toBeInTheDocument();
      expect(mockCancel).toHaveBeenCalledTimes(1);
    });

    it('Should not render Cancel button if prop not set', () => {
      /* Arrange */
      const mockCancel = jest.fn();
      const mockSave = jest.fn();
      const mockSaving = false;
      const mockShowCancel = false;
      const cancelBtnText = 'Cancel';

      /* Act */
      const wrapper = render(
        <ProfileForm
          userData={userMock}
          handleCancel={mockCancel}
          handleSave={mockSave}
          saving={mockSaving}
          showCancel={mockShowCancel}
        />
      );

      /* Assert */
      expect(wrapper.queryByText(cancelBtnText)).toBeNull();
    });

    it('Should render spinner in place of save button when saving profile', () => {
      /* Arrange */
      const mockCancel = jest.fn();
      const mockSave = jest.fn();
      const mockSaving = true;
      const mockShowCancel = true;
      const saveBtnText = 'Save';

      /* Act */
      const wrapper = render(
        <ProfileForm
          userData={userMock}
          handleCancel={mockCancel}
          handleSave={mockSave}
          saving={mockSaving}
          showCancel={mockShowCancel}
        />
      );

      /* Assert */
      expect(wrapper.queryByText(saveBtnText)).toBeNull();
      expect(wrapper.queryByTestId('save-spinner')).toBeInTheDocument();
    });
  });
});
