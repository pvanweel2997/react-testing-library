import React from 'react';
import {  render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import { getUser } from './get-user'
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'

jest.mock('./get-user')

const mockGetUser = jest.mocked(getUser, {shallow: true});


describe("When everything is OK",() => {
  beforeEach( async () =>  {
    await act(async () =>  { render(<App />) })
    waitFor(() => expect(mockGetUser).toHaveBeenCalled())
  })
  test("should render the app component without crashing",() => {
    screen.debug()
  })
  test("should select the children that are being passed to the CustomInput component", () => {
    screen.getAllByText(/Input/);
    expect(screen.getAllByText("Input:")[0]).toBeInTheDocument()
    let error;
    try {
      screen.getByText("Input")
    } catch (e) {
      error = e
    }
    expect(error).toBeDefined
  })

  test("should select the input element by it's role", () => {
    screen.getAllByRole('textbox');
    expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument()
    expect(screen.getAllByRole("textbox").length).toEqual(1)
  })

  test("should select the label element by it's text", () => {
    screen.getAllByLabelText("Input:")
  })

  test("should select input label by placeholder text", () => {
    screen.getAllByPlaceholderText("Example")
  })

  test("should not find the role 'whatever' in our component", () => {
    expect(screen.queryByRole('whatever')).toBeNull;
  })
})
describe("When the component fetches the user successfully",()=> {
  beforeEach(() => {
    mockGetUser.mockClear()
  })

  test("should call getUser once",async ()=> {
    await act(async () =>  { render(<App />) })
    act(() => expect(mockGetUser).toHaveBeenCalledTimes(1))
  })

  test("should render the username passed", async ()=> {
    const name = 'John'
    mockGetUser.mockImplementationOnce(() => 
      Promise.resolve({id: '1', name})
    )
    mockGetUser.mockResolvedValueOnce({id: "1", name})
    render(<App />)
    expect(screen.queryByText(/Username/)).toBeNull()
    screen.debug()
    expect(await screen.findByText(/Username/)).toBeInTheDocument()
    screen.debug()
    expect(await screen.findByText(/name/)).toBeInTheDocument()
  })
})
describe("When the user enters some text in the input element",() => {
  test("it should display the text in the screen",async () => {
    await act(async () =>  { render(<App />) })
    act(() => expect(mockGetUser).toHaveBeenCalledTimes(1))

    expect(screen.getByText(/You typed: .../))

    await userEvent.type(screen.getByRole("textbox"),"Patrick")
    // fireEvent.change(screen.getByRole("textbox"),{
    //   target: { value: 'Patrick'}
    // })
    expect(screen.getByText(/You typed: Patrick/))
  })
})
