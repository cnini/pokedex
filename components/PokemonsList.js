import { FlatList, View } from 'react-native';
import { usePokedexContext } from "../contexts/PokedexContext"
import PokemonCard from './PokemonCard';

export const PokemonsList = () => {
    const { pokemons, displayMore, filterPokemonList } = usePokedexContext()

    return (
        <View>
            <FlatList
                data={filterPokemonList().length === 1 ? filterPokemonList() : pokemons}
                renderItem={pokemonItem => <PokemonCard key={"list_pokemon_" + pokemonItem.index} species={pokemonItem.item} />}
                onEndReached={displayMore}
                onEndReachedThreshold={0.1}
            />
        </View>
    )
}