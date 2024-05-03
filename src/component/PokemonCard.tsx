import { useEffect, useState } from 'react'
import useSWR from 'swr'

const query = async (pokemon: string) =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then((r) => r.json())

export const PokemonCard = ({
  pokemon,
  onPokemonCardClick,
  selected,
  disabled,
}: PokemonCardProps) => {
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
      className={`bg-zinc-800 m-2 rounded-lg size-20  ${disabled ? 'bg-zinc-900 animate-glow-reverse' : ''}  ${glowState}`}
      disabled={disabled}
      onClick={onPokemonCardClick}
    >
      <img src={data.sprites.front_default} />
    </button>
  )
}

type PokemonCardProps = {
  pokemon: string
  onPokemonCardClick: () => void
  selected: boolean
  disabled: boolean
}
