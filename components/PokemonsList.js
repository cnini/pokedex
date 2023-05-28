import { FlatList, View } from 'react-native';
import { usePokedexContext } from "../contexts/PokedexContext"
import PokemonCard from './PokemonCard';

export const PokemonsList = () => {
    const { pokemons, displayMore, filterPokemonList, isUpdated } = usePokedexContext()

    return (
        <View>
            <FlatList
                data={isUpdated ? filterPokemonList() : pokemons}
                renderItem={pokemonItem => <PokemonCard key={"list_pokemon_" + pokemonItem.index} species={pokemonItem.item} />}
                onEndReached={displayMore}
                onEndReachedThreshold={0.1}
            />
        </View>
    )
}