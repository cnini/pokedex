import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "@env";

const PokedexContext = createContext(null)

export const PokedexProvider = ({ children }) => {
    const [pokemons, setPokemons] = useState([])
    const [currentOffset, setCurrentOffset] = useState(0)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [searchingValue, setSearchingValue] = useState('')
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
        const getAllPokemons = async () => {
            setPokemons((await axios(`${API_BASE_URL}/pokemon-species?limit=20`)).data.results)
        }

        getAllPokemons()
    }, [])

    const displayMore = async () => {
        if (isRefreshing) return;

        setIsRefreshing(true)

        const newOffset = currentOffset + 20
        const newData = (await axios(`${API_BASE_URL}/pokemon-species?offset=${newOffset}&limit=20`)).data.results

        setCurrentOffset(newOffset)
        setIsRefreshing(false)
        setPokemons([...pokemons, ...newData])
    }

    const filterPokemonList = () => {
        if (searchingValue !== '') {
            pokemons.filter(
                async (pokemon) => {
                    const names = ((await axios(pokemon.url)).data.names).map(trans => trans.name)
                    
                    if (names.includes(searchingValue)) {
                        return [pokemons]
                    }
                }
            )

        } else {
            return pokemons
        }

        setIsUpdated(false)
    }

    return (
        <PokedexContext.Provider value={
            {
                pokemons,
                displayMore,
                searchingValue, setSearchingValue,
                filterPokemonList,
                isUpdated, setIsUpdated
            }
        }>
            { children }
        </PokedexContext.Provider>
    )
}

export const usePokedexContext = () => useContext(PokedexContext)