import { useEffect, useState } from 'react'
import useSWR from 'swr'

const query = async (pokemon: string) =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((r) => r.json())

export const PokemonOption = ({
  pokemon,
  onPokemonClick,
  selected,
  disabled,
}: PokemonOptionProps) => {
  const { data, isLoading } = useSWR(pokemon, query)

  const [glowState, setGlowState] = useState<'animate-glow' | 'animate-glow-reverse' | ''>('')

  useEffect(() => {
    if (selected) {
      setGlowState('animate-glow')
    } else {
      if (glowState === 'animate-glow') {
        setGlowState('animate-glow-reverse')
      }
    }
  }, [selected])

  if (isLoading) {
    return <div>Loading pokemon</div>
  }

  return (
    <button
      className={`bg-zinc-800 m-2 rounded-lg p-2 ${disabled ? 'bg-zinc-900 animate-glow-reverse' : ''}  ${glowState}`}
      onClick={onPokemonClick}
      disabled={disabled}
    >
      {data.name}
    </button>
  )
}

type PokemonOptionProps = {
  pokemon: string
  onPokemonClick: () => void
  selected: boolean
  disabled: boolean
}
