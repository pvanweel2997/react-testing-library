import React from 'react';
import {  render, screen, fireEvent } from '@testing-library/react';
import { getUser } from './get-user'
import { act } from 'react-dom/test-utils'
import CustomInput from './CustomInput';
import userEvent from '@testing-library/user-event'

describe("When everything is okay",() => {
  test("should call the onChange callback handler when using the fireEvent",() => {
    const onChange = jest.fn()
    render(<CustomInput value="" onChange={onChange}>
      Input:
    </CustomInput>)

    fireEvent.change(screen.getByRole("textbox"),{
      target: { value: 'Patrick'}
    })
    expect(onChange).toHaveBeenCalledTimes(1)
  })
  test("should call the onChange callback handler when using the userEvent",async () => {
    const onChange = jest.fn()
    render(<CustomInput value="" onChange={onChange}>
      Input:
    </CustomInput>)

    await userEvent.type(screen.getByRole("textbox"),"Patrick")
      expect(onChange).toHaveBeenCalledTimes(7)
    })
})