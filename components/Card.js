import Image from "next/image"
import Link from "next/link"

import styles from '../src/styles/Card.module.css'

import handleId from "../utils/handleId"

export default function Card({ pokemon }) {
  const pokemonId = handleId(pokemon.id, 3)

  return(
    <div className={ styles.card }>
      <Image
        src={ `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ pokemonId }.png` }
        width='120'
        height='120'
        alt={ pokemon.name }
      />
      <p className={ styles.id }>#{ pokemonId }</p>
      <h3 className={ styles.title }>{ pokemon.name }</h3>
      <Link
        href={ `/pokemon/${ pokemon.id }` }
        className={ styles.details }
      >
        Detalhes
      </Link>
    </div>
  )
}