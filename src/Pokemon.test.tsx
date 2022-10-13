import react from 'react'
import {  render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from "axios"
import Pokemon from './Pokemon'
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'


jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("When a user enters a valid Pokemon name",()=> {
  test("should show the pokemon abilities of that pokemon",async ()=> {
    const abilities = [
      {
        ability: {
          name: 'test ability 1',
          url: 'https://ability.com/ability1'
        },
      },
      {
        ability: {
          name: 'test ability 2',
          url: 'https://ability.com/ability2'
        },
      }
    ]
    // mockedAxios.get.mockImplementation(() => Promise.resolve({ data: { abilities }}));
    mockedAxios.get.mockResolvedValueOnce({ data: { abilities }})
    await act(async () =>  { render(<Pokemon />) })
    await userEvent.type(screen.getByRole("textbox"), 'ditto')
    await userEvent.click(screen.getByRole("button"))
    const returnedAbilities = await screen.findAllByRole("listitem")
    screen.debug()
    expect(returnedAbilities).toHaveLength(2)
  })
})

describe("when a user enters an invalid pokemon name",()=> {
  test("should show an error message",async ()=> {
   
    // mockedAxios.get.mockImplementation(() => Promise.resolve({ data: { abilities }}));
    mockedAxios.get.mockRejectedValueOnce(new Error())
    await act(async () =>  { render(<Pokemon />) })
    await userEvent.type(screen.getByRole("textbox"), 'invalid-pokemon-name')
    await userEvent.click(screen.getByRole("button"))
    const message = await screen.findByText(/Something went wrong/)
    expect(message).toBeInTheDocument()
  })
})