import React from 'react';
import {  render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { getUser } from './get-user'
import { act } from 'react-dom/test-utils'

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
    screen.getByText("Input:");
    expect(screen.getByText("Input:")).toBeInTheDocument()
    let error;
    try {
      screen.getByText("Input")
    } catch (e) {
      error = e
    }
    expect(error).toBeDefined
  })

  test("should select the input element by it's role", () => {
    screen.getByRole('textbox');
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test("should select the label element by it's text", () => {
    screen.getAllByLabelText("Input:")
    
  })

  test("should select input label by placeholder text", () => {
    screen.getByPlaceholderText("Example")
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
    render(<App />)
    expect(screen.queryByText(/Username/)).toBeNull()
    screen.debug()
    expect(await screen.findByText(/Username/)).toBeInTheDocument()
    screen.debug()
    expect(await screen.findByText(/name/)).toBeInTheDocument()
  })
})
