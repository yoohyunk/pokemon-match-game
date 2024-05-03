import useSWR from 'swr'
import { PokemonCard } from './component/PokemonCard'
import { useEffect, useState } from 'react'
import { PokemonOption } from './component/PokemonOption'

const query = async () => fetch('https://pokeapi.co/api/v2/pokemon/.').then((r) => r.json())

const shuffle = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function App() {
  const [score, setScore] = useState(0)
  const { data, isLoading } = useSWR('pokemons', query)

  const [matches, setMatches] = useState<{
    [pokemonName: string]: boolean
  }>({})
  const [pokemonNames, setPokemonNames] = useState([])
  const [pokemonImageNames, setPokemonImageNames] = useState([])

  useEffect(() => {
    if (!isLoading) {
      const matchTable: { [name: string]: boolean } = {}
      data.results.forEach((item: { name: string }) => {
        matchTable[item.name] = false
      })
      setMatches(matchTable)
      setPokemonNames(shuffle([...data.results]))
      setPokemonImageNames(shuffle([...data.results]))
    }
  }, [data, isLoading])

  const [imageSelected, setImageSelected] = useState('')
  const [nameSelected, setNameSelected] = useState('')
  const [imgBounce, setImgBounce] = useState(false)

  const match = (imageSelected: string, nameSelected: string) => {
    if (imageSelected === nameSelected) {
      setScore(score + 1)
      setImageSelected('')
      setNameSelected('')
      setImgBounce(true)

      setTimeout(() => {
        setImgBounce(false)
      }, 2000)

      const matchCopy = matches
      matchCopy[nameSelected] = true
      setMatches(matchCopy)
    } else {
      if (imageSelected && nameSelected) {
        setImageSelected('')
        setNameSelected('')
      }
    }
  }

  const selectImage = (imgName: string) => {
    setImageSelected(imgName)
    match(imgName, nameSelected)
  }

  const selectName = (nameSelected: string) => {
    setNameSelected(nameSelected)
    match(imageSelected, nameSelected)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <body className="bg-zinc-900 w-screen h-screen text-amber-200 text-center p-4">
      <div className="mx-auto max-w-screen-lg flex flex-col items-center">
        <img src="logo.svg" className="w-56" />

        <div className=" bg-zinc-800 p-2 flex flex-col w-96 mb-16 mt-8  items-center rounded-md">
          <img
            src="img1.png"
            className={`w-28 hover:scale-125 ${imgBounce ? 'animate-bounces' : ''}`}
          />
          <p>Score: {score}</p>
        </div>
        <div className="flex flex-row justify-center gap-2">
          <div className="grid grid-cols-3 gap-4  text-teal-500 bg-zinc-900 w-1/2">
            {pokemonNames.map((item: { name: string }) => (
              <PokemonOption
                key={item.name}
                pokemon={item.name}
                onPokemonClick={() => selectName(item.name)}
                selected={nameSelected === item.name}
                disabled={matches[item.name]}
              />
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4  bg-zinc-900 w-1/2 ">
            {pokemonImageNames.map((item: { name: string }) => (
              <PokemonCard
                key={item.name}
                pokemon={item.name}
                onPokemonCardClick={() => selectImage(item.name)}
                selected={imageSelected === item.name}
                disabled={matches[item.name]}
              />
            ))}
          </div>
        </div>
      </div>
    </body>
  )
}
