import Image from 'next/image'

import styles from '@/styles/Home.module.css'

import Card from '../../components/Card'

export async function getStaticProps() {
  const maxPokemons = 251
  const api = `https://pokeapi.co/api/v2/pokemon`

  const response = await fetch(`${ api }/?limit=${ maxPokemons }`)
  const data = await response.json()

  data.results.forEach((item, index) => {
    item.id = index + 1
  })

  return {
    props: {
      pokemons: data.results,
    },
  }
}

export default function Home({ pokemons }) {
  return (
    <>
      <div className={ styles.titleContainer }>
        <h1 className={ styles.title }>
          Poke<span>DEV</span>
        </h1>
        <Image
          src='/images/pokeball.png'
          width='40'
          height='40'
          alt='Pokebola'
        />
      </div>
      <div className={ styles.pokemonsContainer}>
        { pokemons.map((pokemon) => (
          <Card key={ pokemon.id } pokemon={ pokemon } />
        ))}
      </div>
    </>
  )
}
