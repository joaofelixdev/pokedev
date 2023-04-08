import Image from "next/image"

import styles from '../../styles/Pokemon.module.css'

import handleId from "../../../utils/handleId"

export const getStaticProps = async (context) => {
  const id = context.params.pokemonId
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ id }`)

  const data = await response.json()

  return {
    props: {
      pokemon: data
    }
  }
}

export const getStaticPaths = async () => {
  
  const maxPokemons = 251
  const api = 'https://pokeapi.co/api/v2/pokemon/'

  const response = await fetch(`${ api }/?limit=${ maxPokemons }`)
  const data = await response.json()

  const paths = data.results.map((pokemon, index) => {
    return {
      params: {
        pokemonId: (index + 1).toString()
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export default function pokemonDetails({ pokemon }) {
  const pokemonId = handleId(pokemon.id, 3)

  return (
    <div className={ styles.pokemonContainer }>
      <h1 className={ styles.pokemonName }>{ pokemon.name }</h1>
      <Image
        src={ `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ pokemonId }.png` }
        width='200'
        height='200'
        alt={ pokemon.name }
      />
      <div>
        <h3>Número:</h3>
        <p>#{ pokemonId }</p>
      </div>
      <div>
        <h3>Tipo:</h3>
        <div className={ styles.typesContainer }>
          { pokemon.types.map((item, index) => (
            <span
              key={ index }
              className={ `${ styles.type } ${ styles['type_' + item.type.name] }` }
            >
              { item.type.name }
            </span>
          ))}
        </div>
      </div>
      <div className={ styles.dataContainer }>
        <div className={ styles.dataHeight }>
          <h4>Altura:</h4>
          <p>{ pokemon.height * 10 } cm</p>
        </div>
        <div className={ styles.dataWeight }>
          <h4>Peso:</h4>
          <p>{ pokemon.weight / 10} kg</p>
        </div>
      </div>
    </div>
  )
}