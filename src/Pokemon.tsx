import react, {useState} from 'react'
import axios from 'axios'
import CustomInput from './CustomInput'
import React from 'react'

const pokemonApiUrl = 'https://pokeapi.co/api/v2'

type Ability = {
  ability: {
    name: string
    url: string
  }
  is_hidden : boolean
  slot: number
}

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState("")
  const [pokemonAbilities, setPokemonAbilities] = useState<Ability[]>([])
  const [error,setError] = useState(null)

  const handleFetch = async (event: React.MouseEvent) => {
    let result
    try {
      result = await axios.get(`${pokemonApiUrl}/pokemon/${pokemonName}`)
      setPokemonAbilities(result.data.abilities)
      setError(null)
    } catch (e: any) {
      setPokemonAbilities([])
      setError(e)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value)
  }
  
  return (
    <div>
      <CustomInput value={pokemonName} onChange={handleChange}>Pokemon Name</CustomInput>
      <button type="button" onClick={handleFetch}>
        Fetch Pokemon Abilities
      </button>
      {error && <span>Something went wrong...</span>}
      <ul>
        {pokemonAbilities.map((ability) => (
          <li key={ability.ability.name}>
            <a href={ability.ability.url}>{ability.ability.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pokemon