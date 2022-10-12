import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { getUser } from './get-user'
// import { mocked } from 'ts-jest'

jest.mock('./get-user')

const mockGetUser = jest.mocked(getUser, {shallow: false});


describe("When everything is OK",() => {
  beforeEach(async() => {
    render(<App />)
    await waitFor(() => expect(mockGetUser).toHaveBeenCalled())
  })
  test("should render the app component without crashing",() => {
    // render(<App />)
    screen.debug()
  })
  test("should select the children that are being passed to the CustomInput component", () => {
    // render(<App />)
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
    // render(<App />)
    screen.getByRole('textbox');
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test("should select the label element by it's text", () => {
    // render(<App />)
    screen.getAllByLabelText("Input:")
    
  })

  test("should select input label by placeholder text", () => {
    // render(<App />)
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
   render(<App />)
   await waitFor(() => expect(mockGetUser).toHaveBeenCalledTimes(1))
  })
})
