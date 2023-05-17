import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@env';
import PokemonCard from './components/PokemonCard';

export default function App() {
  const [pokemons, setPokemons] = useState([])
  const [currentOffset, setCurrentOffset] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const getPokemons = async () => {
      setPokemons((await axios(`${API_BASE_URL}/pokemon-species?limit=20`)).data.results)
    }

    getPokemons()
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

  return (
    <View>
      <View style={css.mainHeader}>
        <Text style={css.title}>Pokédex</Text>
      </View>
      <View style={css.container}>
        <FlatList
          data={pokemons}
          renderItem={item => <PokemonCard key={"pokemon_" + item.index} species={item.item} />}
          onEndReached={displayMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  )
}

const css = StyleSheet.create({
  mainHeader : {
    marginTop : 100,
    marginLeft : 20,
    marginBottom : 25
  },

  title : {
    fontSize : 40,
    fontWeight : 'bold'
  },

  container: {
    backgroundColor: '#DFDFDF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection : 'row',
    flexWrap : 'wrap'
  },

  fab : {
    paddingBottom : 20,
    paddingRight : 10
  }
});
