import {getUser} from "./get-user"

describe("When everything is okay",()=>{
  test("should return a response", async ()=> {
    // in a real project, you would use axios and mock the get method
    const result = await getUser()
    expect(result).toEqual({ id: '1', name: 'Patrick'})
  })
})